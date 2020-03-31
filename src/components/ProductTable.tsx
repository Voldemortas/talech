import * as React from 'react'
import { useHistory } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import Product from '../core/entities/Product'
import { useDispatch, useSelector } from 'react-redux'
import { editTableCell } from '../reducers/editTable'
import { updateTable } from '../actions'
import Repository from '../core/entities/Repository'
import { IProductCreationParams } from '../core/entities/ProductWasCreatedEvent'
import { Button } from '@material-ui/core'
import TableInput from './TableInput'

interface HeadCell {
  disablePadding: boolean
  id: keyof Product
  label: string
  numeric: boolean
  hidding: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    hidding: false,
  },
  {
    id: 'EAN',
    numeric: true,
    disablePadding: false,
    label: 'EAN',
    hidding: true,
  },
  {
    id: 'Type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
    hidding: true,
  },
  {
    id: 'Weight',
    numeric: true,
    disablePadding: false,
    label: 'Weight (g)',
    hidding: true,
  },
  {
    id: 'Color',
    numeric: false,
    disablePadding: false,
    label: 'Color',
    hidding: false,
  },
  {
    id: 'Amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
    hidding: false,
  },
  {
    id: 'Price',
    numeric: true,
    disablePadding: false,
    label: 'Price €',
    hidding: false,
  },
  {
    id: 'Active',
    numeric: false,
    disablePadding: false,
    label: 'Active',
    hidding: false,
  },
  {
    id: 'UpdatedAt',
    numeric: false,
    disablePadding: false,
    label: '',
    hidding: false,
  },
]

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={headCell.hidding ? 'hiddingCell' : ''}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ProductTable = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { editTable } = useSelector(
    (state: { editTable: editTableCell }) => state
  )
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, editTable.length - page * rowsPerPage)

  const repo = new Repository<any>().Load('Products')

  return (
    <div {...props}>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead />
            <TableBody>
              {editTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.value.Name!}>
                      <TableCell align='left'>{row.value.Name}</TableCell>
                      <TableCell align='right' className='hiddingCell'>
                        {row.value.EAN}
                      </TableCell>
                      <TableCell align='left' className='hiddingCell'>
                        {row.value.Type}
                      </TableCell>
                      <TableCell align='right' className='hiddingCell'>
                        {row.value.Weight}
                      </TableCell>
                      <TableCell align='left'>{row.value['Color']}</TableCell>
                      <TableCell align='right'>
                        <TableInput
                          title='Amount'
                          helperTexts={['', 'Expected integer']}
                          parentId={row.id}
                          inputProps={{ step: '1' }}
                          predicate={(input) => !/^\d+$/.test(input)}
                          updateFunc={(value) => {
                            repo.Update({
                              data: Product.create(null, value.Amount),
                              id: row.id,
                            })
                            repo.Save('Products')
                          }}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TableInput
                          title='Price'
                          helperTexts={['', 'Expected above 0']}
                          parentId={row.id}
                          inputProps={{ step: '0.01' }}
                          predicate={(input) =>
                            !/^\d+\.?\d*$/.test(input) || +input <= 0
                          }
                          updateFunc={(value) => {
                            repo.Update({
                              data: Product.create(null, null, value.Price),
                              id: row.id,
                            })
                            repo.Save('Products')
                          }}
                        />
                      </TableCell>
                      <TableCell align='left'>
                        <Checkbox
                          checked={row.value.Active!}
                          onChange={(e) => {
                            let temp = { ...row.value }
                            temp.Active = !row.value.Active
                            repo.Update({
                              data: Product.create(
                                temp as IProductCreationParams
                              ),
                              id: row.id,
                            })
                            repo.Save('Products')
                            dispatch(updateTable(row.id, temp as Product))
                          }}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <Button
                          variant='contained'
                          size='small'
                          onClick={(e) => {
                            window.location.href = `/products/${row.id}`
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant='contained'
                          color='primary'
                          size='small'
                          onClick={(e) => {
                            window.location.href = `/products/${row.id}/edit`
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='contained'
                          color='secondary'
                          size='small'
                          onClick={(e) => {
                            let repo = new Repository().Load('Products')
                            repo.Delete(row.id)
                            repo.Save('Products')
                            history.push(`/products/`, {
                              message: 'Item was deleted successfully',
                            })
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={editTable.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <span className='addButton' title='Add new'>
          <AddCircleRoundedIcon
            fontSize='large'
            onClick={(e) => {
              window.location.href = `/products/create`
            }}
          />
        </span>
      </Paper>
    </div>
  )
}

export default ProductTable
