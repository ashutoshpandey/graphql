
const { TodoType, Todos, TodoSubscriptionType } = require('./todoData');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull } = require('graphql');
const { PubSub } = require('graphql-subscriptions');
const { GraphQLInt, GraphQLString, GraphQLBoolean } = require('graphql')
const pubsub = new PubSub();

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        getTodos: {
            type: new GraphQLList(TodoType),
            resolve: () => Todos
        },
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addTodo: {
            type: TodoType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (source, args) => {
                const maxId = Math.max(...Todos.map(todo => todo.id))
                const todo = {
                    id: maxId !== -Infinity ? maxId + 1 : 2,
                    title: args.title.toUpperCase(),
                    description: args.description,
                    completed: false,
                }
                Todos.unshift(todo)

                pubsub.publish('TODO', {
                    todo: {
                        mutation: 'CREATED',
                        data: todo
                    }
                })
                return todo
            }
        },
        updateTodo: {
            type: TodoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                title: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                },
                completed: {
                    type: GraphQLBoolean
                }
            },
            resolve: (source, args) => {
                const todoIndex = Todos.findIndex(todo => todo.id === args.id)
                if (todoIndex !== -1) {
                    const todo = Todos[todoIndex];
                    const { id, ...others } = args
                    const updatedTodo = {
                        ...todo,
                        ...others,
                    };
                    updatedTodo.title = updatedTodo.title.toUpperCase();
                    Todos.splice(todoIndex, 1, updatedTodo);
                    pubsub.publish('TODO', {
                        todo: {
                            mutation: 'UPDATED',
                            data: updatedTodo
                        }
                    })
                    return updatedTodo
                }
                return null
            }
        },
        deleteTodo: {
            type: TodoType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
            },
            resolve: (source, args) => {
                const todo = Todos.find(todo => todo.id === args.id)
                if (todo) {
                    Todos.splice(Todos.indexOf(todo), 1)
                    pubsub.publish('TODO', {
                        todo: {
                            mutation: 'DELETED',
                            data: todo
                        }
                    })
                    return todo
                }
                return null
            }
        },
    })
})

const RootSubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    description: 'Root Subscription',
    fields: () => ({
        todo: {
            type: TodoSubscriptionType,
            subscribe: () => pubsub.asyncIterator(['TODO'])
        },
    }),
})

module.exports = { RootQueryType, RootMutationType, RootSubscriptionType }