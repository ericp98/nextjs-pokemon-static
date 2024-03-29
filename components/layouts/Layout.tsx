import { FC, PropsWithChildren } from "react";

import Head from "next/head";
import { Navbar } from "../ui";

interface Props extends PropsWithChildren {
  title?: string;
}

// Verifica que existe el objeto window al momento de ejecutarse en el front end
const origin = ( typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{title || "Pokmemon App"}</title>
        <meta name="author" content="EricP" />
        <meta name="description" content={`Informacion ${title}`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />
        <meta
          property="og:title"
          content={`Informacion sobre ${title}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta
          property="og:image"
          content={`${origin}/img/banner.png`}
        />
      </Head>

      <Navbar />

      <main
        style={{
          padding: "0px 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
