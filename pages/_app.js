import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevTools } from "react-query/devtools";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevTools />
    </QueryClientProvider>
  );
}

export default MyApp;
