import { Grid, MenuItem, Select, Typography } from "@material-ui/core"
import { useState } from "react"
import { useFirestore } from "react-redux-firebase"
import { orderStateTypes } from "../../../utils/utils"
import { useOrderContext } from "../OrderContext/OrderContext"

export default function OrderHeader({ orderID, state, timestamp }) {
    const orderContext = useOrderContext()
    const firestore = useFirestore()
    const [isUpdating, setIsUpdating] = useState(false)

    const changeOrderState = async (e) => {
        setIsUpdating(true)
        await firestore.collection('orders').doc(orderContext.orderID).update({ state: e.target.value })
        setIsUpdating(false)
    }

    const orderDate = () => {
        let createdAt = timestamp
        let date = new Date(createdAt.seconds * 1000)
        let localeDate = date.toLocaleString('ro-RO')
        return localeDate
    }

    return (
        <Grid container item justify='space-between'>
            <Grid item>
                <Typography>
                    Dată: {orderDate()}
                </Typography>
            </Grid>
            <Grid item>
                <Select
                    value={state}
                    onChange={changeOrderState}
                    variant='outlined'
                    disabled={isUpdating}
                >
                    {orderStateTypes.map((type) => {
                        return <MenuItem value={type.state} key={type.state}>{type.name}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid item>
                <Typography>
                    ID comandă: {orderID}
                </Typography>
            </Grid>
        </Grid>
    )
}