const { GraphQLNonNull, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLObjectType, GRAPHQL_MAX_INT } = require("graphql")

const TodoType = new GraphQLObjectType({
    name: 'Todo',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        completed: { type: new GraphQLNonNull(GraphQLBoolean) }
    })
})

const TodoSubscriptionType = new GraphQLObjectType({
    name: 'Todo_Subscription',
    fields: () => ({
        mutation: { type: new GraphQLNonNull(GraphQLString) },
        data: { type: TodoType }
    })
})

const Todos = [
    {
        id: 1,
        title: 'LEARN MORE ABOUT ANGULAR',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        completed: false
    },
    {
        id: 2,
        title: 'UNDERSTAND GRAPHQL SUBSCRIPTINGS',
        description: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        completed: false
    },
]

module.exports = { TodoType, Todos, TodoSubscriptionType }