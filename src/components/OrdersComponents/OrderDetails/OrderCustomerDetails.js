import { Grid, makeStyles } from "@material-ui/core";
import OrderAddressDetails from "./OrderAddressDetails";
import OrderUserDetails from "./OrderUserDetails";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
}))

export default function OrderCustomerDetails({ order }) {
    const classes = useStyles()

    return (
        <>
            <Grid container item justify='space-between' className={classes.paper}>
                <Grid item xs>
                    {order.user && <OrderUserDetails user={order.user} />}
                </Grid>
                <Grid item xs>
                    {order.address && <OrderAddressDetails address={order.address} />}
                </Grid>
            </Grid>
        </>
    )
}