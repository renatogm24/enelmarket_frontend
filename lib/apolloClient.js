import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLinkVar = new HttpLink({
    uri: "https://enelmarket.herokuapp.com/graphql", //https://enelmarket.herokuapp.com/graphql e.g. https://www.myapi.com/api/v2
  });

  const authLinkVar = authLink.concat(httpLinkVar);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLinkVar,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
