import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";

export default function OrderTotal({ totalPrice, deliveryPrice }) {
    return (
        <>
            <Grid container item direction='column'>
                <Grid item>
                    <Typography component='div'>
                        <Box fontWeight='fontWeightBold'>
                            Total
                        </Box>
                    </Typography>
                </Grid>
                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Subtotal produse
                                    </TableCell>
                                    <TableCell align='right'>
                                        RON {totalPrice.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        Cost livrare
                                    </TableCell>
                                    <TableCell align='right'>
                                        RON {deliveryPrice}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant='head' >
                                        Total
                                    </TableCell>
                                    <TableCell align='right' variant='head'>
                                        RON {(totalPrice + deliveryPrice).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}