import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import ReactHtmlParser from 'react-html-parser';

const CoinPage = ({ serverData }) => {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(serverData)
    setLoading(false)
    // console.log(data)
  }, [data])


  return (
    <Layout customSiteTitle={loading ? "loading" : data.id}>
      {loading ? <p>Loading</p> :
      <>
        <h1>{data.name}</h1>
        <img src={data.image?.large}/>
        <div>{ReactHtmlParser(data.description.en)}</div>
      </>
      }
    </Layout>
  )
}

export default CoinPage

export async function getServerData(context) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${context.params.coinId}`)

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: await res.json()
    }

  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}
