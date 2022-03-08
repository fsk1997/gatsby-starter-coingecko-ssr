import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"

const Layout = ({ children, customSiteTitle }) => {

  const siteTitle = customSiteTitle || "Gatsby x Coingeck SSR"

  return (
    <>
      <Helmet>
        <title>{siteTitle}</title>
      </Helmet>
      <div className="flex flex-col">
        <nav className="py-6 mb-6 border-b border-gray-300">
          <div className="container mx-auto">
            <Link to="/">
              <span className="text-xl font-semibold tracking-tight">
                Gatsby x CoinGecko SSR Starter
              </span>
            </Link>
          </div>
        </nav>
        
        <main className="container mx-auto grow  min-h-[20rem]">{children}</main>
        
        <footer className="border-t border-gray-300 py-6 mt-10">
          <div className="container mx-auto">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>, by <a href="https://www.saykiat.com/bio" target="_blank" rel="noreferrer">SayKiat</a> 
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
