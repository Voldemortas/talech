import React from 'react'
import Edit from '../components/Edit'
import Product from '../Product'
import { useDispatch } from 'react-redux'
import { newForm } from '../actions'

const RouteEdit = () => {
  const dispatch = useDispatch()
  dispatch(newForm())
  return <Edit edit={false} id={undefined} data={new Product()} />
}

export default RouteEdit
