import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { ApolloProvider } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import "styles/globals.css";

const client = new ApolloClient<NormalizedCacheObject>({
  uri: "https://books-graphql.up.railway.app/",
  cache: new InMemoryCache(),
});

export default function Application({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </ApolloProvider>
  );
}
