import Product from '../Product'
import { actionTypes } from '../actions'
const valErrPair: { value: any; error: boolean } = { value: '', error: false }
export type editFormCell = [keyof Product, typeof valErrPair]
export type editFormAction = { type: keyof Product; data: typeof valErrPair }
const defaultState: editFormCell[] = [
  ['Name', valErrPair],
  ['EAN', valErrPair],
  ['Type', valErrPair],
  ['Weight', { value: 0, error: false }],
  ['Color', valErrPair],
  ['Active', { value: true, error: false }],
]
export default function editForm(
  state = defaultState,
  action: actionTypes
): typeof defaultState {
  switch (action.type) {
    case 'SET': {
      return [
        ['Name', { value: action.value.Name, error: false }],
        ['EAN', { value: action.value.EAN, error: false }],
        ['Type', { value: action.value.Type, error: false }],
        ['Weight', { value: action.value.Weight, error: false }],
        ['Color', { value: action.value.Color, error: false }],
        ['Active', { value: action.value.Active, error: false }],
      ]
    }
    case 'UPDATE': {
      const { field, value, error } = action
      let newState = state.filter((s) => s[0] !== field)
      return [...newState, [field, { value, error }]]
    }
    default:
      return state
  }
}
