import Product from './core/entities/Product'
type idValuePair = {
  id: number
  value: Product
}
export type actionTypes =
  | { type: 'UPDATE_FORM'; field: keyof Product; value: any; error: boolean }
  | { type: 'SET_FORM'; value: Product }
  | { type: 'SET_TABLE'; value: idValuePair[] }
  | { type: 'UPDATE_TABLE'; id: number; value: Product }

export const updateForm = (
  field: keyof Product,
  value: any,
  error: boolean
): {
  type: 'UPDATE_FORM'
  field: keyof Product
  value: any
  error: boolean
} => {
  return { type: 'UPDATE_FORM', field, value, error }
}

export const setForm = (
  value: Product
): { type: 'SET_FORM'; value: Product } => {
  return { type: 'SET_FORM', value }
}

export const newForm = () => {
  return setForm(Product.Normalise(new Product()))
}

export const setTable = (
  value: idValuePair[]
): { type: 'SET_TABLE'; value: idValuePair[] } => {
  return { type: 'SET_TABLE', value: value }
}

export const updateTable = (
  id: number,
  value: Product
): { type: 'UPDATE_TABLE'; id: number; value: Product } => {
  return { type: 'UPDATE_TABLE', id, value }
}
