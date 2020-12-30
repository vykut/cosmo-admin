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

const UserContext = React.createContext(null)

export function useUserContext() {
    return useContext(UserContext)
}

export function UserProvider({ children }) {

    const { userID } = useParams()



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

        //functions

    }

    return (
        <>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </>
    )
}
