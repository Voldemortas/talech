import React from 'react'
import { useParams } from 'react-router-dom'
import Details from '../components/Details'

const RouteDetails = () => {
  let { id } = useParams()
  return <Details id={id} />
}

export default RouteDetails
