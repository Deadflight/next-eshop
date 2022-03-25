import { Grid, Typography } from "@mui/material"


export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No products</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6} display='flex'>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${ 355.66 }`}</Typography>
      </Grid>
      <Grid item xs={6} display='flex'>
        <Typography>Tax (15%)</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'>
        <Typography>{`$${ 455.66 }`}</Typography>
      </Grid>
      <Grid item xs={6} display='flex' sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>Total</Typography>
      </Grid>
      <Grid item xs={6} display='flex' justifyContent='end'  sx={{ mt: 2 }}>
        <Typography variant='subtitle1'>{`$${ 555.66 }`}</Typography>
      </Grid>
    </Grid>
  )
}
