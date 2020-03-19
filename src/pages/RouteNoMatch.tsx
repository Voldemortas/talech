import * as React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      Page not found, you may want to visit{' '}
      <Link to='/products'>Product list</Link>
    </div>
  )
}
export default NoMatch
