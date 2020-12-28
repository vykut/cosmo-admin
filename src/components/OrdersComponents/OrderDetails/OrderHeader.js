import { Grid, MenuItem, Select, Typography } from "@material-ui/core"
import { orderStateTypes } from "../../../utils/utils"

export default function OrderHeader({ timestamp, id, orderState, setOrderState }) {
    const changeOrderState = (e) => {
        setOrderState(e.target.value)
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderState}
                    onChange={changeOrderState}
                    // style={{ paddingRight: 8, paddingLeft: 8 }}
                    variant='outlined'
                >
                    {orderStateTypes.map((type) => {
                        return <MenuItem value={type.state} key={type.state}>{type.name}</MenuItem>
                    })}
                </Select>
            </Grid>
            <Grid item>
                <Typography>
                    ID comandă: {id}
                </Typography>
            </Grid>
        </Grid>
    )
}