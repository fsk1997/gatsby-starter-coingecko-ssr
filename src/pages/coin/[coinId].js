import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import ReactHtmlParser from 'react-html-parser';
import { GatsbyImage } from "gatsby-plugin-image";

const CoinPage = ({ serverData: {item, gatsbyImage} }) => {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(item)
    setLoading(false)
    console.log(item)
  }, [item])

  return (
    <Layout customSiteTitle={'single page'}>
      {loading ? <p>Loading</p> :
      <>
        <h1>{item.name}</h1>
        <GatsbyImage image={gatsbyImage} alt={item.name} />
        <div>{ReactHtmlParser(item.description.en)}</div>
      </>
      }
    </Layout>
  )
}

export default CoinPage

export async function getServerData(context) {
  const probe = require('probe-image-size');
  const {
    gatsbyImageResolver
  } = require('gatsby-plugin-utils/dist/polyfill-remote-file/graphql/gatsby-image-resolver');

  try {
    const res = await 
      fetch(`https://api.coingecko.com/api/v3/coins/${context.params.coinId}`)
        
      if (!res.ok) {
      throw new Error(`Response failed`)
    }

    const item = await res.json()

    const image = await probe(item.image.large);
   
    const gatsbyImage = await gatsbyImageResolver(
      {
        url: image.url,
        mimeType: image.mime,
        width: image.width,
        height: image.height,
        filename: `${item.name}-image`
      },
      {
        width: 400,
        layout: 'constrained',
        placeholder: 'none',
        quality: 10
      }
    );
    
    // console.log(gatsbyImage)

    return {
      props: {item, gatsbyImage}
    }

  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}
