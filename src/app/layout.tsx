import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stack orange - the ultimate Bitcoin onboarding platform",
  description: "",
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <script defer data-domain="stackorange.com" src="https://plausible.stackorange.com/js/script.js"></script>
      </head>

      <body className="flex flex-col px-4 h-screen max-w-2xl mx-auto">
        <header className="mt-2 mb-8">
          <h1 className="text-2xl text-orange">Stack orange</h1>
        </header>

        <main className="flex-1 flex justify-center">{children}</main>

        <footer></footer>
      </body>
    </html>
  );
};
