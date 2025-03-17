import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stack Orange - they won't get it until they get some",
  description:
    "The easiest way to orange-pill nocoiners by getting their hands dirty with their first sats. Plant the seeds of financial revolution.",
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

      <body className="flex flex-col px-4 pt-12 h-screen max-w-2xl mx-auto">
        <main className="flex-1">{children}</main>

        <footer className="my-4 text-center text-white-muted">
          <p>© {new Date().getFullYear()} Stack Orange · commit</p>
        </footer>
      </body>
    </html>
  );
};
