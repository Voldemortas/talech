import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormControlLabel, Switch } from '@material-ui/core'
import { editFormCell } from '../reducers/editForm'
import { updateForm } from '../actions'
import Product from '../Product'

const EditFormSwitch = ({
  title,
  label,
  params,
}: {
  title: keyof Product
  label: string
  params?: object
}) => {
  const dispatch = useDispatch()
  const { value } = useSelector(
    (state: { editForm: editFormCell[] }) => state.editForm
  ).filter((e) => e[0] === title)[0][1]
  return (
    <>
      <FormControlLabel
        {...params}
        control={<Switch checked={value} color='primary' />}
        id={title}
        label={label}
        labelPlacement='start'
        onChange={(event) => {
          dispatch(updateForm(title, !value, false))
        }}
      />
      <br />
    </>
  )
}

export default EditFormSwitch
