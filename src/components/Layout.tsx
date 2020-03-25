import React, { FunctionComponent, ReactElement } from 'react'

interface ILayout {
  children: ReactElement
}

const Layout: FunctionComponent<any> = (props: ILayout) => (
  <>
    <header className='header'>
      <span className='headerLogo'>
        <a href='/products'>Warehouse</a>
      </span>
    </header>
    <main
      style={{
        textAlign: 'center',
      }}
    >
      {props.children}
    </main>
  </>
)

export default Layout
