import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextField } from '@material-ui/core'
import { editFormCell } from '../reducers/editForm'
import { updateForm } from '../actions'
import Product from '../core/entities/Product'

const EditFormInput = (props: {
  title: keyof Product
  label: string
  helperTexts: [string, string?]
  required?: boolean
  inputProps?: object
  predicate?: (input: any) => boolean
  type?: HTMLInputElement['type']
  params?: object
}) => {
  const {
    title,
    label,
    helperTexts,
    required,
    predicate,
    inputProps,
    type,
    params,
  } = props
  const dispatch = useDispatch()
  const { value, error } = useSelector(
    (state: { editForm: editFormCell[] }) => state.editForm
  ).filter((e) => e[0] === title)[0][1]
  return (
    <>
      <TextField
        {...params}
        id={(title as unknown) as string}
        label={label + (required ? ' *' : '')}
        variant='outlined'
        value={value}
        onChange={(event) => {
          dispatch(updateForm(title, event.target.value, false))
        }}
        error={error}
        helperText={error ? helperTexts[1] : helperTexts[0]}
        onBlur={() => {
          if (predicate !== undefined && predicate(value)) {
            dispatch(updateForm(title, value, true))
          }
        }}
        inputProps={inputProps}
        type={type}
      />
      <br />
    </>
  )
}

export default EditFormInput
