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

const CategoryContext = React.createContext(null)

export function useCategoryContext() {
    return useContext(CategoryContext)
}

export function CategoryProvider({ children }) {
    // const [orderTab, setOrderTab] = useState(orderStateTypes[0].state)
    // const [filterOption, setFilterOption] = useState({ option: 'createdAt', direction: 'desc' })
    const { categoryID } = useParams()

    const mainCategoriesStoreAs = `categories-main`
    useFirestoreConnect(() => {
        // console.log(props)
        // console.log(orderTab)
        return [
            {
                collection: 'categories',
                where: [['mainCategory', '==', true]],
                orderBy: [['name', 'asc']],
                storeAs: mainCategoriesStoreAs,
            },
        ]
    })

    const mainCategories = useSelector(
        ({ firestore }) => firestore.data[mainCategoriesStoreAs]
    )

    useFirestoreConnect(() => {
        // console.log(props)
        // console.log(orderTab)
        return [
            {
                collection: 'categories',
                orderBy: [['name', 'asc']],
            },
        ]
    })

    const categories = useSelector(
        ({ firestore }) => firestore.data.categories
    )



    const value = {
        //vars
        mainCategories,
        categories,
        //functions
    }

    return (
        <>
            <CategoryContext.Provider value={value}>
                {children}
            </CategoryContext.Provider>
        </>
    )
}
