import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    TodoComponent,
    TodoViewComponent,
    TodoEditComponent,
    TodoAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApolloModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        // Create an http link:
        const http = httpLink.create({
          uri: 'http://localhost:4000/graphql',
        });
 
        // Create a WebSocket link:
        const ws = new GraphQLWsLink(
          createClient({
            url: "ws://localhost:4000/graphql",
          }),
        );
 
        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
          },
          ws,
          http,
        )
        return {
          link,
          cache: new InMemoryCache()
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
