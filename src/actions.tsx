import Product from './core/entities/Product'
export type actionTypes =
  | { type: 'UPDATE'; field: keyof Product; value: any; error: boolean }
  | { type: 'SET'; value: Product }

export const updateForm = (
  field: keyof Product,
  value: any,
  error: boolean
): { type: 'UPDATE'; field: keyof Product; value: any; error: boolean } => {
  return { type: 'UPDATE', field, value, error }
}

export const setForm = (value: Product): { type: 'SET'; value: Product } => {
  return { type: 'SET', value }
}

export const newForm = () => {
  return setForm(Product.Normalise(new Product()))
}
