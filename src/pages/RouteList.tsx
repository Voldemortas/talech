import * as React from 'react'
import { useHistory } from 'react-router-dom'
import ProductTable from '../components/ProductTable'
import { useDispatch } from 'react-redux'
import Repository from '../core/entities/Repository'
import { Reducer } from '@nxcd/tardis'
import Product from '../core/entities/Product'
import { setTable } from '../actions'
import ProductWasCreatedEvent from '../core/entities/ProductWasCreatedEvent'
import ProductPriceWasEdited from '../core/entities/ProductPriceWasEditedEvent'
import ProductAmountWasEdited from '../core/entities/ProductAmountWasEditedEvent'
import Layout from '../components/Layout'
import Toast from '../components/Toast'

const RouteList = () => {
  const history = useHistory()
  const { ...state }: any = history.location
  let message = undefined
  if (state.state !== undefined) {
    message = state.state.message
  }
  const dispatch = useDispatch()
  let repo = new Repository<any>().Load('Products')
  let rows = repo.Select({ deleted: false }).map((e) => {
    return { value: e.Data, id: e.id }
  })
  const productReducer = new Reducer<Product>({
    [ProductWasCreatedEvent.eventName]: ProductWasCreatedEvent.commit,
    [ProductPriceWasEdited.eventName]: ProductPriceWasEdited.commit,
    [ProductAmountWasEdited.eventName]: ProductAmountWasEdited.commit,
  })

  const data = rows
    .map((row) => productReducer.reduce(new Product(), row.value))
    .map((e, i) => {
      return { id: rows[i].id, value: e }
    })
    .sort((a, b) => a.id - b.id)
  dispatch(setTable(data))
  return (
    <Layout>
      {message === undefined ? '' : <Toast message={message} />}
      <ProductTable
        style={{ display: 'inline-block', maxWidth: 1100, width: '100%' }}
      />
    </Layout>
  )
}

export default RouteList
