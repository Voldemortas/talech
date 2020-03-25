import { Event } from '@nxcd/tardis'
import Product from './Product'

export default class ProductAmountWasEdited extends Event<{ Amount: number }> {
  static eventName = 'product-amount-was-changed'

  constructor(data: { Amount: number }) {
    super(ProductAmountWasEdited.eventName, data)
  }

  static commit(state: Product, event: ProductAmountWasEdited): Product {
    state.Amount = event.data.Amount
    state.UpdatedAt = event.timestamp
    return state
  }
}
