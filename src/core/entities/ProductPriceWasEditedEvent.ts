import { Event } from '@nxcd/tardis'
import Product from './Product'

export default class ProductPriceWasEdited extends Event<{ Price: number }> {
  static eventName = 'product-price-was-changed'

  constructor(data: { Price: number }) {
    super(ProductPriceWasEdited.eventName, data)
  }

  static commit(state: Product, event: ProductPriceWasEdited): Product {
    state.Price = event.data.Price
    state.UpdatedAt = event.timestamp
    return state
  }
}
