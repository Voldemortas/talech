import React from 'react'
import { render } from '@testing-library/react'
import Details from '../components/Details'

test('empty id', () => {
  const { getByText } = render(<Details id={''} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test id of only letters', () => {
  const { getByText } = render(<Details id={'a'} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test alphanumeric id 1', () => {
  const { getByText } = render(<Details id={'5a'} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})
test('test alphanumeric id 2', () => {
  const { getByText } = render(<Details id={'a5'} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test floating id1', () => {
  const { getByText } = render(<Details id={'1.3'} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test floating id2', () => {
  const { getByText } = render(<Details id={'1.0'} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test id=0', () => {
  const { getByText } = render(<Details id={0} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test id < 0', () => {
  const { getByText } = render(<Details id={-3} />)
  const linkElement = getByText(/wrong id/i)
  expect(linkElement).toBeInTheDocument()
})

test('test id >= 1', () => {
  const { getByText } = render(<Details id={13} />)
  const linkElement = getByText(/13/i)
  expect(linkElement).toBeInTheDocument()
})
