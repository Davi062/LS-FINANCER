import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="h-full bg-white dark:bg-black transition-colors">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
