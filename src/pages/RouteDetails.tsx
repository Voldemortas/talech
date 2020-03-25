import React from 'react'
import { useParams } from 'react-router-dom'
import Details from '../components/Details'
import Layout from '../components/Layout'

const RouteDetails = () => {
  let { id } = useParams()
  return (
    <Layout>
      <Details id={id} />
    </Layout>
  )
}

export default RouteDetails
