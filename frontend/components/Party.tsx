import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function Party() {

  const code = useParams()
  const [location , setlocation ] = useState('')

  useEffect(() => {

    async function result() {
      const response = await axios.get("http://localhost:3002/api/party/group", {
        params : {
          id : code.id
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setlocation(response.data.location)
    }

    result()

  }, [])

  return (
    <div>Party : {code.id} , {location}</div>
  )
}


export default Party