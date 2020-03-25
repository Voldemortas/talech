import Product from '../core/entities/Product'
import { actionTypes } from '../actions'
const valErrPair: { value: any; error: boolean } = { value: '', error: false }
export type editFormCell = [keyof Product, typeof valErrPair]
const defaultState: editFormCell[] = [
  ['Name', valErrPair],
  ['EAN', valErrPair],
  ['Type', valErrPair],
  ['Weight', { value: 0, error: false }],
  ['Color', valErrPair],
  ['Active', { value: true, error: false }],
  ['Amount', { value: 0, error: false }],
  ['Price', { value: 0, error: false }],
]
export default function editForm(
  state = defaultState,
  action: actionTypes
): typeof defaultState {
  switch (action.type) {
    case 'SET_FORM': {
      return [
        ['Name', { value: action.value.Name, error: false }],
        ['EAN', { value: action.value.EAN, error: false }],
        ['Type', { value: action.value.Type, error: false }],
        ['Weight', { value: action.value.Weight, error: false }],
        ['Color', { value: action.value.Color, error: false }],
        ['Active', { value: action.value.Active, error: false }],
        ['Amount', { value: action.value.Amount, error: false }],
        ['Price', { value: action.value.Price, error: false }],
      ]
    }
    case 'UPDATE_FORM': {
      const { field, value, error } = action
      let newState = state.filter((s) => s[0] !== field)
      return [...newState, [field, { value, error }]]
    }
    default:
      return state
  }
}
