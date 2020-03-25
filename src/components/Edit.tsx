import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isPositiveInteger from '../functions/isPositiveInteger'
import Product from '../core/entities/Product'
import { Button, Paper } from '@material-ui/core'
import EditFormInput from '../components/EditFormInput'
import { useHistory } from 'react-router-dom'
import { setForm } from '../actions'
import { editFormCell } from '../reducers/editForm'
import Repository from '../core/entities/Repository'
import EditFormSwitch from './EditFormSwitch'

type EditProps = {
  edit: boolean
  id: string | undefined
  data?: Product
}

const Edit = ({ edit, id, data }: EditProps) => {
  function submitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    let formData = new Product()
    formData.Name = editForm.filter((e) => e[0] === 'Name')[0][1].value
    formData.EAN = editForm.filter((e) => e[0] === 'EAN')[0][1].value
    formData.Type = editForm.filter((e) => e[0] === 'Type')[0][1].value
    formData.Weight = +editForm.filter((e) => e[0] === 'Weight')[0][1].value
    formData.Color = editForm.filter((e) => e[0] === 'Color')[0][1].value
    formData.Active = editForm.filter((e) => e[0] === 'Active')[0][1].value
    formData.Amount = +editForm.filter((e) => e[0] === 'Amount')[0][1].value
    formData.Price = +editForm.filter((e) => e[0] === 'Price')[0][1].value
    formData = Product.Normalise(formData)
    if (Product.isValid(formData)) {
      //INSERT INTO DATABASE
      const events = Product.create(
        formData.isBaseSame(data!)
          ? null
          : {
              Name: formData.Name!,
              EAN: formData.EAN!,
              Type: formData.Type!,
              Weight: formData.Weight!,
              Color: formData.Color!,
              Active: formData.Active!,
            },
        formData.Amount === data!.Amount ? null : formData.Amount,
        formData.Price === data!.Price ? null : formData.Price
      )
      const repo = new Repository<any>().Load('Products')
      if (!edit) {
        repo.Insert(events)
        repo.Save('Products')
        history.push('/products', {
          message: 'New item was added successfully',
        })
      } else {
        repo.Update({ id: +id!, data: events })
        repo.Save('Products')
        history.push(`/products/${id!}/edit`, {
          message: 'Item was updated successfully',
        })
      }
    } else {
      // let's pop errors where needed
      let focused = { id: '' }
      try {
        focused = { ...{ id: document.activeElement!.id } }
      } catch (e) {}
      for (let name in new Product()) {
        document.getElementById(name)?.focus()
        document.getElementById(name)?.blur()
      }
      if (focused.id !== '') {
        document.getElementById(focused.id)!.focus()
      }
    }
  }

  const history = useHistory()
  const dispatch = useDispatch()
  const { editForm } = useSelector(
    (state: { editForm: editFormCell[] }) => state
  )

  return !isPositiveInteger(id) && edit ? (
    <div>Wrong id</div>
  ) : (
    <Paper className='editForm'>
      <form autoComplete='off' onSubmit={submitForm}>
        <EditFormInput
          title='Name'
          label='Name'
          required={true}
          helperTexts={[
            'The name of the Product',
            'Name field must not be empty',
          ]}
          predicate={(input) => input === ''}
        />
        <EditFormInput
          title='EAN'
          label='EAN'
          required={true}
          type='number'
          helperTexts={[
            'Barcode (EAN-8 or EAN-13)',
            'Please write only 8 or 13 digits',
          ]}
          predicate={(input) =>
            !/^\d{8}$/.test(input) && !/^\d{13}$/.test(input)
          }
        />
        <EditFormInput
          title='Type'
          label='Type'
          required={true}
          helperTexts={[
            'Please specify the type',
            'Type field must not be empty',
          ]}
          predicate={(input) => input === ''}
        />
        <EditFormInput
          title='Weight'
          label='Weight'
          required={true}
          helperTexts={['Grams, up to 1 decimal point', 'Wrong weight']}
          predicate={(input) => +input <= 0 || !/^\d*\.?\d+$/.test(input)}
          type='number'
          inputProps={{ step: '0.1' }}
        />
        <EditFormInput
          title='Color'
          label='Color'
          required={true}
          helperTexts={[
            'Select existing or write your own',
            'Color field must not be empty',
          ]}
          predicate={(input) => input === ''}
        />
        <EditFormInput
          title='Amount'
          label='Amount'
          required={true}
          helperTexts={[
            'How many items are there?',
            'Amount should be a positive integer',
          ]}
          type='number'
          inputProps={{ step: '1' }}
          predicate={(input) => !/^\d+$/.test(input)}
        />
        <EditFormInput
          title='Price'
          label='Price'
          required={true}
          helperTexts={['Price in €', 'Price should be above 0']}
          type='number'
          inputProps={{ step: '0.01' }}
          predicate={(input) => !/^\d+\.?\d*$/.test(input) || +input <= 0}
        />
        <EditFormSwitch title='Active' label='Active' />
        {edit ? (
          <>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              onClick={() => {
                dispatch(setForm(data!))
              }}
            >
              Restore changes
            </Button>
            <br />
            <br />
          </>
        ) : (
          ''
        )}
        <Button type='submit' variant='contained' color='primary'>
          {edit ? 'Save changes' : 'Add new product'}
        </Button>
      </form>
    </Paper>
  )
}

export default Edit
