import PageContainer from "../components/AuxiliaryComponents/PageContainer";
import Categories from "../components/CategoriesComponents/Categories";
import { CategoryProvider } from "../components/CategoriesComponents/CategoryContext/CategoryContext";
import CategoryCreator from "../components/CategoriesComponents/CategoryCreator";
import CategoryDetails from "../components/CategoriesComponents/CategoryDetails";
import Dashboard from "../components/DashboardComponents/Dashboard";
import Market from "../components/MarketComponents/Market";
import { OrderProvider } from "../components/OrdersComponents/OrderContext/OrderContext";
import OrderDetails from "../components/OrdersComponents/OrderDetails/OrderDetails";
import OrdersWithStore from "../components/OrdersComponents/Orders";
import Orders from "../components/OrdersComponents/Orders";
import { ProductProvider } from "../components/ProductsComponents/ProductContext/ProductContext";
import ProductCreator from "../components/ProductsComponents/ProductCreator";
import ProductDetails from "../components/ProductsComponents/ProductDetails";
import Products from "../components/ProductsComponents/Products";
import ProductsList from "../components/ProductsComponents/ProductsList";
import { UserProvider } from "../components/UsersComponents/UserContext/UserContext";
import Users from "../components/UsersComponents/Users";

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const actionTypes = {
    login: 'login',
    resetPassword: 'reset-password',
    signUp: 'sign-up',
}

export function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

export const all = 'toate'

export const websiteAddress = "https://cosmo-market.ro"

export const pages = [
    {
        title: 'Dashboard',
        mainPath: '/dashboard/',
        layout: PageContainer,
        provider: CategoryProvider,
        subRoutes: [
            {
                name: 'Dashboard',
                path: '/dashboard/',
                component: Dashboard,
            },
        ]
    },
    {
        title: 'Categorii',
        mainPath: '/categorii/',
        layout: Categories,
        provider: CategoryProvider,
        subRoutes: [
            {
                name: 'Detalii categorie',
                path: '/categorii/:categoryID/detalii/',
                component: CategoryDetails,
                showBack: true,
            },
            {
                name: 'Adaugă subcategorie',
                path: '/categorii/:categoryID/adauga-subcategorie/',
                component: CategoryCreator,
                showBack: true,
            },
            {
                name: 'Categorii',
                path: '/categorii/',
                component: CategoryDetails,
            },
        ]
    },
    {
        title: 'Produse',
        mainPath: '/categorii/toate/produse/',
        layout: PageContainer,
        provider: ProductProvider,
        subRoutes: [
            {
                name: 'Adaugă produs',
                path: '/categorii/:categoryID/produse/adauga-produs/',
                component: ProductDetails,
                showBack: true,
            },
            {
                name: 'Detalii produs',
                path: '/categorii/:categoryID/produse/:productID/detalii/',
                component: ProductDetails,
                showBack: true,
            },
            {
                name: 'Produse',
                path: '/categorii/:categoryID/produse/',
                component: Products,
            },
        ]
    },
    {
        title: 'Comenzi',
        mainPath: '/comenzi/',
        layout: PageContainer,
        provider: OrderProvider,
        subRoutes: [
            {
                name: 'Detalii comandă',
                path: '/comenzi/:orderID/detalii/',
                component: OrderDetails,
                showBack: true,
            },
            {
                name: 'Comenzi',
                path: '/comenzi/',
                component: Orders,
            }
        ]
    },
    {
        title: 'Utilizatori',
        mainPath: '/utilizatori/',
        layout: PageContainer,
        provider: UserProvider,
        subRoutes: [
            {
                name: 'Utilizatori',
                path: '/utilizatori/',
                component: Users,
            }
        ]
    },
    // {
    //     component: Users,
    //     name: 'Utilizatori',
    //     path: '/utilizatori',
    // },
    // {
    //     component: Market,
    //     name: 'Magazin',
    //     path: '/magazin',
    // },
]

export const orderStateTypes = [
    {
        state: 'pending',
        name: 'În așteptare',
    },
    {
        state: 'assigned',
        name: 'Preluate',
    },
    {
        state: 'delivered',
        name: 'Livrate',
    },
    {
        state: 'canceled',
        name: 'Anulate',
    },
]
