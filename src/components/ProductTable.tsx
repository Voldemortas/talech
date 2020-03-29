import * as React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import { updateTable } from '../actions'
import Repository from '../core/entities/Repository'
import { IProductCreationParams } from '../core/entities/ProductWasCreatedEvent'
import Product from '../core/entities/Product'
import { useDispatch, useSelector } from 'react-redux'
import { editTableCell } from '../reducers/editTable'

type Order = 'asc' | 'desc'

interface HeadCell {
  disablePadding: boolean
  id: keyof Product
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
  {
    id: 'Name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  { id: 'EAN', numeric: true, disablePadding: false, label: 'EAN' },
  { id: 'Type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'Weight', numeric: true, disablePadding: false, label: 'Weight (g)' },
  {
    id: 'Color',
    numeric: false,
    disablePadding: false,
    label: 'Color',
  },
  { id: 'Amount', numeric: false, disablePadding: false, label: 'Amount' },
  { id: 'Price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'Active', numeric: false, disablePadding: false, label: 'Active' },
  { id: 'UpdatedAt', numeric: false, disablePadding: false, label: '' },
]

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span
                  style={{
                    border: 0,
                    clip: 'rect(0 0 0 0)',
                    height: 1,
                    margin: -1,
                    overflow: 'hidden',
                    padding: 0,
                    position: 'absolute',
                    top: 20,
                    width: 1,
                  }}
                >
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
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
  const dispatch = useDispatch()
  const { editTable } = useSelector(
    (state: { editTable: editTableCell }) => state
  )
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Product>('Name')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

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
      <Paper style={{ marginTop: 15 }}>
        <TableContainer>
          <Table
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={editTable.length}
            />
            <TableBody>
              {editTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow key={row.value.Name!}>
                      <TableCell align='left'>{row.value.Name}</TableCell>
                      <TableCell align='right'>{row.value.EAN}</TableCell>
                      <TableCell align='left'>{row.value.Type}</TableCell>
                      <TableCell align='right'>{row.value.Weight}</TableCell>
                      <TableCell align='left'>{row.value['Color']}</TableCell>
                      <TableCell align='right'>{row.value.Amount}</TableCell>
                      <TableCell align='right'>{row.value.Price}</TableCell>
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
      </Paper>
    </div>
  )
}

export default ProductTable
