import { useParams } from 'next/navigation'
import React from 'react'

function Party() {

    const code = useParams()

  return (
    <div>Party : {code.id}</div>
  )
}

export default Party