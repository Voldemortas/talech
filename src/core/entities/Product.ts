import ProductWasCreatedEvent, {
  IProductCreationParams,
} from './ProductWasCreatedEvent'

class Product {
  Name: string | null
  EAN: string | null
  Type: string | null
  Weight: number | null
  Color: string | null
  Active: boolean | null
  UpdatedAt: Date | null

  constructor(
    name: string | null = null,
    ean: string | null = null,
    type: string | null = null,
    weight: number | null = null,
    color: string | null = null,
    active: boolean | null = null
  ) {
    this.Name = name
    this.EAN = ean
    this.Type = type
    this.Weight = weight
    this.Color = color
    this.Active = active
    this.UpdatedAt = null
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
    }
  }

  static isValid(product: Product): boolean {
    return (
      product.Name! !== '' &&
      (/^\d{8}$/.test(product.EAN!) || /^\d{13}$/.test(product.EAN!)) &&
      product.Type !== '' &&
      /^\d*\.?\d+$/.test(product.Weight + '') &&
      product.Color !== ''
    )
  }

  static create(data: IProductCreationParams) {
    return new ProductWasCreatedEvent(data)
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
    return product
  }
}

export default Product
