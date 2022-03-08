import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import ReactHtmlParser from "react-html-parser"

import Jimp from "jimp"

const IndexPage = ({ serverData }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(serverData.data)
    setLoading(false)
    // console.log(data)
  }, [data])

  return (
    <Layout customSiteTitle={loading ? "loading" : data.id}>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <h1>{data.name}</h1>
          <img src={serverData.image} alt={data.name} />
          <div>{ReactHtmlParser(data.description.en)}</div>
        </>
      )}
    </Layout>
  )
}

export default IndexPage

export async function getServerData(context) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${context.params.coinId}`
    )

    const data = await res.json()

    let image = ""

    await Jimp.read({ url: data.image.large }).then(img => {
      img
        .resize(50, 50)
        .quality(60)
        .greyscale()
        .getBase64(Jimp.AUTO, (err, img) => {
          image = img
        })
    })

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: { data, image },
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
