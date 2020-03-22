import React from 'react'
import { useParams } from 'react-router-dom'
import Edit from '../components/Edit'
import { useDispatch } from 'react-redux'
import { setForm } from '../actions'
import Product from '../core/entities/Product'

const RouteEdit = () => {
  const dispatch = useDispatch()
  const tempProduct = new Product(
    'DataTraveler 4gb',
    '12345678',
    'usb key',
    5,
    'White',
    true
  )
  dispatch(setForm(tempProduct))
  let { id } = useParams()
  return <Edit edit={true} id={id} data={tempProduct} />
}

export default RouteEdit
