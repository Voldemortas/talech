import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Edit from '../components/Edit'
import { useDispatch } from 'react-redux'
import { setForm } from '../actions'
import Product from '../core/entities/Product'
import Repository from '../core/entities/Repository'
import { Reducer } from '@nxcd/tardis'
import ProductWasCreatedEvent from '../core/entities/ProductWasCreatedEvent'
import ProductPriceWasEdited from '../core/entities/ProductPriceWasEditedEvent'
import ProductAmountWasEdited from '../core/entities/ProductAmountWasEditedEvent'
import Layout from '../components/Layout'
import Toast from '../components/Toast'

const RouteEdit = () => {
  const { id } = useParams()
  const history = useHistory()
  const { ...state }: any = history.location
  let message = undefined
  if (state.state !== undefined) {
    message = state.state.message
  }
  const dispatch = useDispatch()
  const repo = new Repository<any>().Load('Products')
  let rows = repo.Select({ id: +id! })
  if (rows.length === 0) {
    rows = repo.Select({ id: +id!, deleted: true })
    if (rows.length === 0) {
      return <div>No item found</div>
    } else {
      return <div>Item was deleted</div>
    }
  }
  const row = rows[0].Data
  const productReducer = new Reducer<Product>({
    [ProductWasCreatedEvent.eventName]: ProductWasCreatedEvent.commit,
    [ProductPriceWasEdited.eventName]: ProductPriceWasEdited.commit,
    [ProductAmountWasEdited.eventName]: ProductAmountWasEdited.commit,
  })
  const data = productReducer.reduce(new Product(), row)
  dispatch(setForm(data))
  return (
    <Layout>
      {message === undefined ? '' : <Toast message={message} />}
      <Edit edit={true} id={id} data={data} />
    </Layout>
  )
}

export default RouteEdit
