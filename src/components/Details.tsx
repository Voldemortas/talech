import React from 'react'
import isPositiveInteger from '../functions/isPositiveInteger'

type DetailsType = {
  id: string | undefined
}

const Details = ({ id }: DetailsType) => {
  return !isPositiveInteger(id) ? (
    <div>Wrong id</div>
  ) : (
    <div>Placeholder for {id} product</div>
  )
}

export default Details
