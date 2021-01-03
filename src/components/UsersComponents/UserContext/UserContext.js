import React, { useContext, useEffect, useState } from 'react'
import { isEmpty, isLoaded, populate, useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { orderStateTypes } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const populates = [
    { child: 'addressID', root: 'addresses', childAlias: 'address' },
    { child: 'riderID', root: 'users', childAlias: 'rider' },
]

const userPopulates = [
    {
        child: 'favoriteProducts',
        root: 'products',
        childAlias: 'products'
    }
]

const UserContext = React.createContext(null)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {
    const [orderBy, setOrderBy] = useState('email')
    const [direction, setDirection] = useState('asc')
    const [filter, setFilter] = useState('')
    const { userID } = useParams()
    const firebase = useFirebase()

    const sort = (sortOption) => {
        if (orderBy === sortOption) {
            setDirection((direction) => direction === 'asc' ? 'desc' : 'asc')
        } else {
            setOrderBy(sortOption)
            setDirection('asc')
        }
    }

    useFirestoreConnect([{
        collection: 'users',
        orderBy: [[orderBy, direction]],
    }])

    const users = useSelector(
        ({ firestore }) => firestore.data.users
    )

    const userStoreAs = `${userID}-user`
    useFirestoreConnect([{
        collection: 'users',
        doc: userID,
        storeAs: userStoreAs
    }, { collection: 'products' }])

    const user = useSelector(
        ({ firestore }) => populate(firestore, userStoreAs, userPopulates)
    )

    const userAddressesStoreAs = `${userID}-addresses`
    useFirestoreConnect(() => {
        if (userID)
            return [{
                collection: 'addresses',
                where: [['userID', '==', userID]],
                storeAs: userAddressesStoreAs
            }]
    })

    const userAddresses = useSelector(
        ({ firestore }) => firestore.data[userAddressesStoreAs]
    )

    const userOrdersStoreAs = `${userID}-orders`
    useFirestoreConnect(() => {
        if (userID)
            return [{
                collection: 'orders',
                where: [['userID', '==', userID]],
                storeAs: userOrdersStoreAs
            }]
    })

    const userOrders = useSelector(
        ({ firestore }) => populate(firestore, userOrdersStoreAs, populates)
    )

    const ordersRevenue = () => {
        var revenue = 0
        if (!isEmpty(userOrders)) {
            revenue = Object.entries(userOrders).reduce((acc, curr) => acc + curr[1].totalPrice, 0)
        }
        return revenue
    }

    // const userFavoriteProductsStoreAs = `${userID}-favorites`
    // useFirestoreConnect(() => {
    //     if (userID)
    //         return [{
    //             collection: 'products',
    //             where: [['userID', '==', userID]],
    //             storeAs: userFavoriteProductsStoreAs
    //         }]
    // })

    // const userFavoriteProducts = useSelector(
    //     ({ firestore }) => firestore.data[userFavoriteProductsStoreAs]
    // )

    const value = {
        //vars
        users,
        orderBy,
        direction,
        user,
        userAddresses,
        userOrders,
        //functions
        sort,
        ordersRevenue,
    }

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
