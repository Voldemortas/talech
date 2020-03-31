import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import { editTableCell } from '../reducers/editTable'
import { updateTable } from '../actions'
import Product from '../core/entities/Product'

interface ITableInput {
  parentId: number
  title: keyof Product
  helperTexts: [string, string?]
  inputProps?: object
  predicate?: (input: any) => boolean
  type?: HTMLInputElement['type']
  updateFunc?: (value: Product) => void
  params?: object
}

const TableInput = ({
  parentId,
  title,
  helperTexts,
  inputProps,
  predicate,
  type,
  updateFunc,
  params,
}: ITableInput) => {
  const truePredicate = predicate === undefined ? () => false : predicate
  const trueUpdateFunc =
    updateFunc === undefined ? (value: Product) => {} : updateFunc
  const dispatch = useDispatch()
  const { id, value } = useSelector(
    (state: { editTable: editTableCell }) => state.editTable
  ).filter((e) => e.id === parentId)[0]
  return (
    <>
      <TextField
        className='tableInput'
        {...params}
        id={(title as unknown) as string}
        variant='standard'
        value={value[title]}
        error={truePredicate(value[title])}
        helperText={
          truePredicate(value[title]) ? helperTexts[1] : helperTexts[0]
        }
        onChange={(event) => {
          let newProduct = { ...value, [title]: event.target.value } as Product
          dispatch(updateTable(id, newProduct))
        }}
        onBlur={(e) => {
          if (!truePredicate(value[title])) {
            trueUpdateFunc(value)
          }
        }}
        inputProps={inputProps}
        type={type}
      />
    </>
  )
}

export default TableInput
