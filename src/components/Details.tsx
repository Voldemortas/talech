import React from 'react'
import isPositiveInteger from '../functions/isPositiveInteger'
import {
  Typography,
  Box,
  useTheme,
  AppBar,
  Tabs,
  Tab,
  Paper,
} from '@material-ui/core'

import SwipeableViews from 'react-swipeable-views'
import Repository from '../core/entities/Repository'
import { Reducer } from '@nxcd/tardis'
import Product from '../core/entities/Product'
import ProductWasCreatedEvent from '../core/entities/ProductWasCreatedEvent'
import ProductPriceWasEdited from '../core/entities/ProductPriceWasEditedEvent'
import ProductAmountWasEdited from '../core/entities/ProductAmountWasEditedEvent'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

type DetailsType = {
  id: string | undefined
}

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

interface IFVP {
  field: string
  value: any
}

const FieldValuePair = (props: IFVP) => {
  return (
    <>
      <span style={{ float: 'left' }}>{props.field}</span>
      <span style={{ float: 'right' }}>{props.value}</span> <br />
    </>
  )
}

const Details = (props: DetailsType) => {
  const { id } = props

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  let repo = new Repository<any>().Load('Products')
  let rows = repo.Select({ id: +id! })
  if (rows.length === 0) {
    rows = repo.Select({ id: +id!, deleted: true })
    if (rows.length === 0) {
      return <div>No item found</div>
    } else {
      return <div>Item was deleted</div>
    }
  }
  let row = rows[0].Data
  const productReducer = new Reducer<Product>({
    [ProductWasCreatedEvent.eventName]: ProductWasCreatedEvent.commit,
    [ProductPriceWasEdited.eventName]: ProductPriceWasEdited.commit,
    [ProductAmountWasEdited.eventName]: ProductAmountWasEdited.commit,
  })
  const data = productReducer.reduce(new Product(), row)

  const prices: ProductPriceWasEdited[] = row.filter(
    (e) => e.name === ProductPriceWasEdited.eventName
  )
  const priceHistory: [number, number][] = prices
    .slice(Math.max(0, prices.length - 5))
    .map((e) => [new Date(e.timestamp).getTime(), e.data.Price])

  const amounts: ProductAmountWasEdited[] = row.filter(
    (e) => e.name === ProductAmountWasEdited.eventName
  )
  const amountHistory: [number, number][] = amounts
    .slice(Math.max(0, prices.length - 5))
    .map((e) => [new Date(e.timestamp).getTime(), e.data.Amount])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index: number) => {
    setValue(index)
  }

  return (
    <div style={{ display: 'inline-block' }}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <Tab label='Details' {...a11yProps(0)} />
          <Tab label='Amount History' {...a11yProps(1)} />
          <Tab label='Price History' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <Paper>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className='details'>
              <h1>{data.Name}</h1>
              <FieldValuePair field={'EAN code:'} value={data.EAN} />
              <FieldValuePair field={'Type:'} value={data.Type} />
              <FieldValuePair field={'Weigth:'} value={data.Weight + ' g'} />
              <FieldValuePair field={'Color:'} value={data.Color} />
              <FieldValuePair field={'Price:'} value={data.Price + ' €'} />
              <FieldValuePair field={'Amount:'} value={data.Amount} />
              <FieldValuePair
                field={'Active?'}
                value={data.Active ? 'Yes' : 'No'}
              />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: `Amount history of ${data.Name}`,
                },
                chart: {
                  type: 'spline',
                },
                xAxis: {
                  type: 'datetime',
                },
                series: [
                  {
                    data: amountHistory,
                    name: 'Units',
                  },
                ],
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                title: {
                  text: `Price history of ${data.Name}`,
                },
                chart: {
                  type: 'spline',
                },
                xAxis: {
                  type: 'datetime',
                },
                series: [
                  {
                    data: priceHistory,
                    name: 'Price in €',
                  },
                ],
              }}
            />
          </TabPanel>
        </SwipeableViews>
      </Paper>
    </div>
  )
}

export default Details
