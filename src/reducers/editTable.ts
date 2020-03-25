import Product from '../core/entities/Product'
import { actionTypes } from '../actions'
export type editTableCell = { id: number; value: Product }[]
const defaultState: editTableCell = []
export default function editTable(
  state = defaultState,
  action: actionTypes
): typeof defaultState {
  switch (action.type) {
    case 'SET_TABLE': {
      console.log(action)
      return action.value
    }
    case 'UPDATE_TABLE': {
      return [
        ...state.filter((e) => e.id !== action.id),
        { id: action.id, value: action.value },
      ].sort((a, b) => a.id - b.id)
    }
    default:
      return state
  }
}
