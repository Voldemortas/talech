import React from 'react'
import Edit from '../components/Edit'
import Product from '../core/entities/Product'
import { useDispatch } from 'react-redux'
import { newForm } from '../actions'

const RouteEdit = () => {
  const dispatch = useDispatch()
  dispatch(newForm())
  return (
    <Edit edit={false} id={undefined} data={Product.Normalise(new Product())} />
  )
}

export default RouteEdit
