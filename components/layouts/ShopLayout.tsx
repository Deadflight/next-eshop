import Head from "next/head"
import { FC } from "react"
import { Navbar } from "../ui"
import { SideMenu } from '../ui';

interface Props {
  title: string,
  pageDescription: string,
  imageFullUrl?: string,
}

export const ShopLayout: FC<Props> = ({children, title, pageDescription, imageFullUrl}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={pageDescription} />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <SideMenu />
      <main style={{
        margin: '5rem auto',
        maxWidth: '1440px',
        padding: '0 1.875rem',
      }}>
        {children}
      </main>
      <footer>
        {/*Footer */}
      </footer>
    </>
  )
}
