import React from 'react'
import isPositiveInteger from '../functions/isPositiveInteger'

type EditProps = {
  edit: boolean
  id: string | undefined
}
const Edit = (props: EditProps) => {
  let { edit, id } = props
  return !isPositiveInteger(id) && edit ? (
    <div>Wrong id</div>
  ) : (
    <div>
      Placeholder for{' '}
      {edit ? `editing selected (${id}) product` : `creating new products`}
    </div>
  )
}

export default Edit
