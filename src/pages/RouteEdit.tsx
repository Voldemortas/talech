import React from 'react'
import { useParams } from 'react-router-dom'
import Edit from '../components/Edit'

const RouteEdit = () => {
  let { id } = useParams()
  return <Edit edit={true} id={id} />
}

export default RouteEdit
