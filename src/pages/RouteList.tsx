import * as React from 'react'
import ProductTable from '../components/ProductTable'
import { useDispatch } from 'react-redux'
import Repository from '../core/entities/Repository'
import { Reducer } from '@nxcd/tardis'
import Product from '../core/entities/Product'
import { setTable } from '../actions'
import ProductWasCreatedEvent from '../core/entities/ProductWasCreatedEvent'
import ProductPriceWasEdited from '../core/entities/ProductPriceWasEditedEvent'
import ProductAmountWasEdited from '../core/entities/ProductAmountWasEditedEvent'

const RouteList = () => {
  const dispatch = useDispatch()
  let repo = new Repository<any>().Load('Products')
  let rows = repo.Select().map((e) => {
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
  dispatch(setTable(data))
  return (
    <ProductTable
      style={{ display: 'inline-block', maxWidth: 1100, width: '100%' }}
    />
  )
}

export default RouteList
