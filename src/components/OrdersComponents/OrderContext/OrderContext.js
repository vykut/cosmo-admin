import React, { useContext, useEffect, useState } from 'react'
import { isEmpty, isLoaded, populate, useFirestoreConnect } from 'react-redux-firebase';
import { orderStateTypes } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const populates = [
    { child: 'userID', root: 'users', childAlias: 'user' },
    { child: 'addressID', root: 'addresses', childAlias: 'address' },
    { child: 'riderID', root: 'users', childAlias: 'rider' },
]

const OrderContext = React.createContext(null)

export function useOrderContext() {
    return useContext(OrderContext)
}

export function OrderProvider({ children }) {
    const [orderTab, setOrderTab] = useState(orderStateTypes[0].state)
    const [filterOption, setFilterOption] = useState({ option: 'createdAt', direction: 'desc' })
    const { orderID } = useParams()

    const ordersByTab = `orders-${orderTab}`
    useFirestoreConnect(() => {
        // console.log(props)
        // console.log(orderTab)
        return [
            {
                collection: 'orders',
                where: [['state', '==', orderTab]],
                orderBy: [[filterOption.option, filterOption.direction]],
                storeAs: ordersByTab,
            },
            { collection: 'users' },
            { collection: 'addresses' }
        ]
    })

    const orders = useSelector(
        ({ firestore }) => populate(firestore, ordersByTab, populates),
    )

    const changeOrderTab = (orderState) => {
        setOrderTab(orderState)
    }

    const changeFilterOption = (filterOption) => {
        setFilterOption(filterOption)
    }

    const revenueByOrderState = !isEmpty(orders) && Object.entries(orders).reduce((acc, curr) => acc + curr[1].totalPrice, 0).toFixed(2)

    const storeAsOrder = `order-${orderID}`
    useFirestoreConnect(() => {
        return [
            {
                collection: 'orders',
                doc: orderID,
                storeAs: storeAsOrder
            },
            { collection: 'users' },
            { collection: 'addresses' }
        ]
    })

    const order = useSelector(
        ({ firestore }) => populate(firestore, storeAsOrder, populates),
    )

    const storeAsProductsInOrder = `productsInOrder-${orderID}`
    useFirestoreConnect(() => {
        if (orderID)
            return [
                { collection: 'orders' },
                {
                    collection: 'orders',
                    doc: orderID,
                    subcollections: [{ collection: 'products' }],
                    storeAs: storeAsProductsInOrder,
                },
            ]
    })

    const productsInOrder = useSelector(
        ({ firestore }) => firestore.data[storeAsProductsInOrder]
    )

    const productsStoreAs = 'productsWithStockOrderedAlphabetically'
    useFirestoreConnect([{
        collection: 'products',
        where: [['stock', '==', true]],
        orderBy: [['name', 'asc']],
        storeAs: productsStoreAs
    },])

    const products = useSelector(
        ({ firestore }) => firestore.data[productsStoreAs]
    )

    const value = {
        //vars
        orders,
        orderTab,
        filterOption,
        revenueByOrderState,
        order,
        orderID,
        productsInOrder,
        products,
        //functions
        changeOrderTab,
        changeFilterOption,
    }

    return (
        <>
            <OrderContext.Provider value={value}>
                {children}
            </OrderContext.Provider>
        </>
    )
}
