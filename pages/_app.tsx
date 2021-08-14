import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { ApolloProvider } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { Provider as NextAuthProvider } from "next-auth/client";
import "styles/globals.css";
import { isRoleVar } from "graphql/reactiveVar";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (process.browser) {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    },
  };
});

export const client = new ApolloClient<NormalizedCacheObject>({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isRoleVar: {
            read: () => {
              return isRoleVar();
            },
          },
        },
      },
    },
  }),
});

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <GeistProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </GeistProvider>
      </ApolloProvider>
    </NextAuthProvider>
  );
}
