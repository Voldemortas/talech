class Product {
  Name!: string
  EAN!: string
  Type!: string
  Weight!: number
  Color!: string
  Active!: boolean
  constructor(
    name = '',
    ean = '',
    type = '',
    weight = 0,
    color = '',
    active = true
  ) {
    this.Name = name
    this.EAN = ean
    this.Type = type
    this.Weight = weight
    this.Color =
      color.length > 0 ? color[0].toUpperCase() + color.slice(1) : color
    this.Active = active
  }
  static isValid(
    product: Product,
    key: keyof Product | undefined = undefined
  ): [boolean, string] {
    const predicates: [keyof Product, { (param: any): boolean }, string][] = [
      ['Name', (input: string) => input !== '', "Name can't be empty"],
      [
        'EAN',
        (input: string) => /\d{8}/.test(input) || /\d{13}/.test(input),
        'Barcode must either be EAN-8 or EAN-13',
      ],
    ]
    if (key === undefined) {
      return [true, '']
    } else {
      let index = predicates.findIndex((e) => e[0] === key)
      return [predicates[index][1](product[key]), predicates[index][2]]
    }
  }
}

export default Product
