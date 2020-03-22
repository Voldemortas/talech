import { Event } from '@nxcd/tardis'
import Product from './Product'

export interface IProductCreationParams {
  Name: string
  EAN: string
  Type: string
  Weight: number
  Color: string
  Active: boolean
}

export default class ProductWasCreated extends Event<IProductCreationParams> {
  static eventName = 'product-was-created'

  constructor(data: IProductCreationParams) {
    super(ProductWasCreated.eventName, data)
  }

  static commit(state: Product, event: ProductWasCreated): Product {
    state.Name = event.data.Name
    state.EAN = event.data.EAN
    state.Type = event.data.Type
    state.Weight = event.data.Weight
    state.Color = event.data.Color
    state.Active = event.data.Active
    state.UpdatedAt = event.timestamp
    return state
  }
}
