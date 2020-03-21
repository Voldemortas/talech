import React from 'react'
import { render } from '@testing-library/react'
import Edit from '../components/Edit'
import Product from '../Product'

test('EDIT | empty id', () => {
  const { getByText } = render(
    <Edit id={''} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test id of only letters', () => {
  const { getByText } = render(
    <Edit id={'a'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test alphanumeric id 1', () => {
  const { getByText } = render(
    <Edit id={'5a'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})
test('EDIT | test alphanumeric id 2', () => {
  const { getByText } = render(
    <Edit id={'a5'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test floating id1', () => {
  const { getByText } = render(
    <Edit id={'1.3'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test floating id2', () => {
  const { getByText } = render(
    <Edit id={'1.0'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test id=0', () => {
  const { getByText } = render(
    <Edit id={'0'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test id < 0', () => {
  const { getByText } = render(
    <Edit id={'-3'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('EDIT | test id >= 1', () => {
  const { getByText } = render(
    <Edit id={'13'} edit={true} data={new Product()} />
  )
  const linkElement = getByText(/13/i)
  expect(linkElement).toBeInTheDocument()
})

///

test('CREATE | id = any', () => {
  const { getByText } = render(
    <Edit id={undefined} edit={false} data={new Product()} />
  )
  const linkElement = getByText(/creating/i)
  expect(linkElement).toBeInTheDocument()
})
