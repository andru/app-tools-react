import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { useEffect, useState } from "react";

const errorMessages: Record<string, string> = {
  TC_NF: 'Failed to load user data. Not available.',
  TC_NI: 'Failed to load user data. Not initialized.',
  TC_USER_NF: 'Failed to load user data. User data not found.',
}

// import { loadWebbridge, WebbridgeProvider } from '~/webbridge-react/dist/webbridge-react.es'
// const webbridgeClient = loadWebbridge({ test: false })

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

type LoaderData = {
  tcCustomerId: string | undefined;
  error: string | null;
};

export const routeId = "root"; // Add this export

export function clientLoader() {
  return new Promise<LoaderData>((resolve, reject) => {
    const tcInterval = setInterval(() => {
      if (typeof Tapcart !== 'undefined') {
        const tc = Tapcart;
        if (tc.isInitialized) {
          resolve({tcCustomerId: tc.variables?.customer?.id as string, error: null});
          clearInterval(tcInterval);
        }
      }
    }, 100);

    const tcTimeout = setTimeout(() => {
      clearInterval(tcInterval);
      if (typeof Tapcart === 'undefined') {
        resolve({ tcCustomerId: undefined, error: 'TC_NF' });
      } else {
        const tc = Tapcart;
        if (!tc.isInitialized) {
          resolve({ tcCustomerId: undefined, error: 'TC_NI' });
        } else {
          if (!tc.variables?.customer?.id) {
            // if we have Tapcart, but no customer data, we need to reload the page
            const reloaded = window.sessionStorage.get('tapcart-reload');
            if (!reloaded || (Date.now() - parseInt(reloaded, 10)) > 1000 * 60) {
              // if we haven't reloaded in the last 60 seconds, reload the page
              window.sessionStorage.setItem('tapcart-reload', Date.now().toString());
              // console.warn('Tapcart is initialized, but no customer data. Reloading page...');
              window.location.reload();
            }
            resolve({ tcCustomerId: undefined, error: 'TC_USER_NF' });
          }
        }
      }
    }, 1000);

  });
}

export function HydrateFallback() {
  return <div className="h-full flex items-center justify-center"><span className="animate-pulse">Loading...</span></div>;
}


export function Layout({ children }: { children: React.ReactNode }) {

   const tcData = useLoaderData<typeof clientLoader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* we're having to use this, because the react package doesn't work with React 19 */}
        <script src="https://cdn.tapcart.com/webbridge-sdk/webbridge.umd.js" defer></script>
        <Meta />
        <Links />
      </head>
      <body>
        {/* <WebbridgeProvider webbridgeClient={webbridgeClient}> */}
          {children}
          {tcData?.error ? (
            <div className="fixed bottom-0 right-0 left-0 w-full p-5 bg-red-50 text-red-500 text-center">
              {errorMessages[tcData.error] ?? tcData.error}
            </div>
          ) : null}
          {/* </WebbridgeProvider> */}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
