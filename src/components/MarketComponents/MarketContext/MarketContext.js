import { useSnackbar } from 'notistack'
import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

const MarketContext = React.createContext(null)

export function useMarketContext() {
    return useContext(MarketContext)
}

export default function MarketProvider({ children }) {
    const [role, setRole] = useState('rider')
    const [orderBy, setOrderBy] = useState('email')
    const [direction, setDirection] = useState('asc')
    const { enqueueSnackbar } = useSnackbar()
    const firestore = useFirestore()

    const sort = (sortOption) => {
        if (orderBy === sortOption) {
            setDirection((direction) => direction === 'asc' ? 'desc' : 'asc')
        } else {
            setOrderBy(sortOption)
            setDirection('asc')
        }
    }

    const cosmoMarketDoc = 'CosmoMarket'
    useFirestoreConnect([{
        collection: 'stores',
        doc: cosmoMarketDoc,
    }])

    const market = useSelector(
        ({ firestore }) => firestore.data.stores && firestore.data.stores[cosmoMarketDoc]
    )

    const usersRolesStoreAs = `${role}-users-orderBy-${orderBy}-${direction}`
    useFirestoreConnect([{
        collection: 'users',
        where: [['role', '==', role]],
        orderBy: [[orderBy, direction]],
        storeAs: usersRolesStoreAs,
    }])

    const usersWithRoles = useSelector(
        ({ firestore }) => {
            return firestore.data[usersRolesStoreAs]
        }
    )

    const changeRole = (role) => {
        setRole(role)
    }

    const removeUserRole = async (userID) => {
        await firestore.collection('users').doc(userID).update({
            role: ''
        })
    }

    const value = {
        //vars
        market,
        usersWithRoles,
        role,
        orderBy,
        direction,
        //functions
        changeRole,
        sort,
        removeUserRole,

    }

    return (
        <>
            <MarketContext.Provider value={value}>
                {children}
            </MarketContext.Provider>
        </>
    )

}
