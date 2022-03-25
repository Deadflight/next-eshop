import { Typography, Grid, Chip, Link } from '@mui/material';
import { ShopLayout } from "../../components/layouts"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order ID',
    width: 100,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 300,
  },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows if the order was paid or not',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label='Paid' variant='outlined'/>
          : <Chip color='error' label='Not paid' variant='outlined'/>
      )
    }
  },
  {
    field: 'orders',
    headerName: 'View Order',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline='always' >{params.row.order}</Link>
        </NextLink>
      )
    }
  }
]

const rows = [
  {
    id: 1,
    fullName: 'Carlos Correa',
    paid: true,
    order: '123',
  },
  {
    id: 2,
    fullName: 'Carlos Correa',
    paid: false,
    order: '123',
  },
  {
    id: 3,
    fullName: 'Carlos Correa',
    paid: true,
    order: '123',
  },
  {
    id: 4,
    fullName: 'Carlos Correa',
    paid: false,
    order: '123',
  },
  {
    id: 5,
    fullName: 'Carlos Correa',
    paid: true,
    order: '123',
  },
  {
    id: 6,
    fullName: 'Carlos Correa',
    paid: true,
    order: '123',
  }
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Orders history'} pageDescription={'Client Orders History'}>
      <Typography variant='h1' component='h1'>Orders history</Typography>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid 
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={ [10] }
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage