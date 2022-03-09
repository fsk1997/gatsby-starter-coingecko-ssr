import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

const IndexPage = ({ serverData }) => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setData(serverData)
    setLoading(false)
  }, [data])
  
  return (
    <Layout>
      <h1 className="mb-6">Top 100 Coins Listing Page</h1>
      {loading ? <p className="font-bold text-2xl py-6">Loading, please wait...</p> :
        <>
          {data?.map((d, i) => {
            return (
              <ul>
                <li className="mb-3">
                  <Link 
                    className="text-blue-500 hover:text-blue-600 transition-all ease-in duration-150" 
                    key={i} to={`/coin/${d.id}`}>{d.id} - {d.name} - {d.symbol}</Link>
                </li>
              </ul>
            )
          })}
        </>
      }
    </Layout>
  )
}

export default IndexPage

export async function getServerData() {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

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