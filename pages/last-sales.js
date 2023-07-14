import useSWR from "swr";
import { useEffect, useState } from "react";

function LastSalesPage(){

  const [sales, setSales] = useState();
  const {data, error} = useSWR("Request_URL")

  // Transform API data
  useEffect(()=>{
    if (data){
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume
        })
      }
      setSales(transformedSales);
    }
  }, [data])

  // If there is an error, show it
  if (!error) return <p>Error happened</p>

  // If we don't have data yet, it means we are loading (This return value will be pre rendered)
  if (!data) return <p>Loading ...</p>

  // If sales are not ready then we are loading them.
  if (!sales) return <p>Loading ...</p>

  // Output data if everything is ok.
  return <>
    Data from API here
  </>
}

export default LastSalesPage;