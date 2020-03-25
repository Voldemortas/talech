import ProductWasCreatedEvent, {
  IProductCreationParams,
} from './ProductWasCreatedEvent'
import ProductAmountWasEdited from './ProductAmountWasEditedEvent'
import ProductPriceWasEdited from './ProductPriceWasEditedEvent'

class Product {
  Name: string | null
  EAN: string | null
  Type: string | null
  Weight: number | null
  Color: string | null
  Active: boolean | null
  UpdatedAt: Date | null
  Amount: number | null
  Price: number | null

  constructor(
    name: string | null = null,
    ean: string | null = null,
    type: string | null = null,
    weight: number | null = null,
    color: string | null = null,
    active: boolean | null = null,
    amount: number | null = null,
    price: number | null = null
  ) {
    this.Name = name
    this.EAN = ean
    this.Type = type
    this.Weight = weight
    this.Color = color
    this.Active = active
    this.UpdatedAt = null
    this.Amount = amount
    this.Price = price
  }

  public get State() {
    return {
      Name: this.Name,
      EAN: this.EAN,
      Type: this.Type,
      Weight: this.Weight,
      Color: this.Color,
      Active: this.Active,
      UpdatedAt: this.UpdatedAt,
      Amount: this.Amount,
      Price: this.Price,
    }
  }

  public isBaseSame(product: Product): boolean {
    return (
      product.Name === this.Name &&
      product.EAN === this.EAN &&
      product.Type === this.Type &&
      product.Weight === this.Weight &&
      product.Color === this.Color &&
      product.Active === this.Active
    )
  }

  static isValid(product: Product): boolean {
    return (
      product.Name! !== '' &&
      (/^\d{8}$/.test(product.EAN!) || /^\d{13}$/.test(product.EAN!)) &&
      product.Type !== '' &&
      /^\d*\.?\d+$/.test(product.Weight + '') &&
      product.Color !== '' &&
      /^\d*$/.test(product.Amount! + '') &&
      /^\d*\.?\d+$/.test(product.Price! + '') &&
      product.Price! > 0
    )
  }

  static create(
    data: IProductCreationParams | null = null,
    amount: number | null = null,
    price: number | null = null
  ) {
    let temp: any[] = data !== null ? [new ProductWasCreatedEvent(data)] : []
    if (amount !== null) {
      temp.push(new ProductAmountWasEdited({ Amount: amount! }))
    }
    if (price !== null) {
      temp.push(new ProductPriceWasEdited({ Price: price! }))
    }
    return temp
  }

  /**
   * @description Sets nulls to empty strings or 0s
   */
  static Normalise(product: Product): Product {
    product.Name = product.Name === null ? '' : product.Name
    product.EAN = product.EAN === null ? '' : product.EAN
    product.Type = product.Type === null ? '' : product.Type
    product.Weight = product.Weight === null ? 0 : product.Weight
    product.Color = product.Color === null ? '' : product.Color
    product.Active = product.Active === null ? false : product.Active
    product.Amount = product.Amount === null ? 0 : product.Amount
    product.Price = product.Price === null ? 0 : product.Price
    return product
  }
}

export default Product
