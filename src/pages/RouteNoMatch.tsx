import * as React from 'react'
import { Link, useHistory } from 'react-router-dom'

const NoMatch = () => {
  const history = useHistory()
  history.push('/products', {
    message: "Page you were looking for wasn't found",
  })
  return <></>
}
export default NoMatch
