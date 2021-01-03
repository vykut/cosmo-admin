import React, { useCallback, useContext, useEffect, useState } from 'react'
import { isEmpty, isLoaded, populate, useFirestoreConnect } from 'react-redux-firebase';
import { all, orderStateTypes } from '../../../utils/utils';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductContext = React.createContext(null)

export function useProductContext() {
    return useContext(ProductContext)
}

export function ProductProvider({ children }) {
    const { categoryID, productID } = useParams()
    const [filter, setFilter] = useState({ option: 'name', ascending: true })
    const [nameFilter, setNameFilter] = useState('')

    const mainCategoriesStoreAs = `categories-main`
    useFirestoreConnect(() => {
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

    const orderedProductsStoreAs = 'orderedProducts'
    useFirestoreConnect(() => {
        return [
            {
                collection: 'products',
                orderBy: [['name', 'asc']],
                storeAs: orderedProductsStoreAs,
            }
        ]
    })

    const products = useSelector(
        ({ firestore }) => firestore.data[orderedProductsStoreAs]
    )

    const productsByCategoryStoreAs = 'productsByCategory'
    useFirestoreConnect(() => {
        return [
            {
                collection: 'products',
                where: [['categories', 'array-contains', categoryID]],
                storeAs: productsByCategoryStoreAs
            }
        ]
    })

    const productsByCategory = useSelector(
        ({ firestore }) => firestore.data[productsByCategoryStoreAs]
    )

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const changeNameFilter = (newFilter) => {
        setNameFilter(newFilter)
    }

    const getProducts = () => {
        var productsToBeReturned
        if (categoryID === all)
            productsToBeReturned = products
        else
            productsToBeReturned = productsByCategory
        if (productsToBeReturned) {
            const sortOption = filter.option
            productsToBeReturned = Object.entries(productsToBeReturned).filter((product) => {
                return product[1].name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(nameFilter) || product[0].includes(nameFilter)
            })
            productsToBeReturned.sort((a, b) => {
                if (filter.ascending) {
                    return a[1][sortOption] < b[1][sortOption] ? -1 : 1
                }
                return a[1][sortOption] > b[1][sortOption] ? -1 : 1
            })
            return productsToBeReturned
        }
    }

    const value = {
        //vars
        filter,
        mainCategories,
        categories,
        products,
        productsByCategory,

        //functions
        changeFilter,
        changeNameFilter,
        getProducts,
    }

    return (
        <>
            <ProductContext.Provider value={value}>
                {children}
            </ProductContext.Provider>
        </>
    )
}
