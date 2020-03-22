import { Event } from '@nxcd/tardis'
import Product from './Product'

export default class ProductNameWasEdited extends Event<{ Name: string }> {
  static eventName = 'product-name-was-added'

  constructor(data: { Name: string }) {
    super(ProductNameWasEdited.eventName, data)
  }

  static commit(state: Product, event: ProductNameWasEdited): Product {
    state.Name = event.data.Name
    state.UpdatedAt = event.timestamp
    return state
  }
}
