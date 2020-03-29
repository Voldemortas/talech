import React from 'react'
import { useParams } from 'react-router-dom'
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

const RouteEdit = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  let repo = new Repository<any>().Load('Products')
  let rows = repo.Select({ id: +id! })
  if (rows.length === 0) {
    rows = repo.Select({ id: +id!, deleted: true })
    if (rows.length === 0) {
      return <div>No item found</div>
    } else {
      return <div>Item was deleted</div>
    }
  }
  let row = rows[0].Data
  const productReducer = new Reducer<Product>({
    [ProductWasCreatedEvent.eventName]: ProductWasCreatedEvent.commit,
    [ProductPriceWasEdited.eventName]: ProductPriceWasEdited.commit,
    [ProductAmountWasEdited.eventName]: ProductAmountWasEdited.commit,
  })
  const data = productReducer.reduce(new Product(), row)
  dispatch(setForm(data))
  return <Edit edit={true} id={id} data={data} />
}

export default RouteEdit
