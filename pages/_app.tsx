import AppLayout from "@book-tracker/components/core/layout/app-layout";
import { ToastNotificationProvider } from "@book-tracker/components/ui/toast-notification/toast-notification";
import "@book-tracker/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastNotificationProvider>
      <AppLayout>
        <Head>
          <title>Book Tracker</title>
          <meta
            name="description"
            content="Book management app that helps you keep track of your books"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />
      </AppLayout>
    </ToastNotificationProvider>
  );
}
