import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirebase, useFirestore, useFirestoreConnect } from 'react-redux-firebase'

const DashboardContext = React.createContext(null)

export function useDashboardContext() {
    return useContext(DashboardContext)
}

export default function DashboardProvider({ children }) {
    const { enqueueSnackbar } = useSnackbar()
    const firebase = useFirebase()
    const [period, setPeriod] = useState(firebase.firestore.Timestamp.fromDate((d => new Date(d.setDate(d.getDate() - 1)))(new Date())))
    const [income, setIncome] = useState(0)

    const deliveredOrdersStoreAs = `dashboard-delivered-orders-${period}`
    useFirestoreConnect([{
        collection: 'orders',
        where: [['state', '==', 'delivered'], ['createdAt', '>=', period]],
        storeAs: deliveredOrdersStoreAs,
    }])

    const deliveredOrders = useSelector(
        ({ firestore }) => firestore.data[deliveredOrdersStoreAs]
    )

    useEffect(() => {
        var income = 0
        if (isLoaded(deliveredOrders) && !isEmpty(deliveredOrders)) {
            income = Object.entries(deliveredOrders).reduce((acc, curr) => {
                return acc + curr[1].totalPrice
            }, 0)
        }
        setIncome(income)
    }, [deliveredOrders])

    console.log(deliveredOrders)


    const changePeriod = (numberOfDays) => {
        const date = (d => new Date(d.setDate(d.getDate() - numberOfDays)))(new Date())
        const timestamp = firebase.firestore.Timestamp.fromDate(date)
        setPeriod(timestamp)
    }


    const value = {
        //vars
        income,

        //functions
        changePeriod,


    }

    return (
        <>
            <DashboardContext.Provider value={value}>
                {children}
            </DashboardContext.Provider>
        </>
    )

}
