import { Grid, makeStyles } from "@material-ui/core";
import OrderAddressDetails from "./OrderAddressDetails";
import OrderUserDetails from "./OrderUserDetails";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2)
    },
}))

export default function OrderCustomerDetails({ user, userID, address, addressID }) {
    const classes = useStyles()

    return (
        <>
            <Grid container item justify='space-between' className={classes.paper}>
                <Grid item xs>
                    {user && <OrderUserDetails user={user} id={userID} />}
                </Grid>
                <Grid item xs>
                    {address && <OrderAddressDetails address={address} id={addressID} />}
                </Grid>
            </Grid>
        </>
    )
}