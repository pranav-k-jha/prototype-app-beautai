import React from "react";
import { ApolloProvider } from "@apollo/client";
import SignIn from "./(auth)/sign-in";
import client from "./(api)/graphql/client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SignIn />
    </ApolloProvider>
  );
};

export default App;
