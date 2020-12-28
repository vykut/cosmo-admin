import { Box, Grid, Typography } from "@material-ui/core";

export default function OrderNotes({ order }) {
    return (
        <>
            {order.notes && <Grid container item direction='column'>
                <Grid item >
                    <Typography component='div'>
                        <Box fontWeight='fontWeightBold'>
                            Note
                        </Box>
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        {order.notes}
                    </Typography>
                </Grid>
            </Grid>}
        </>
    )
}