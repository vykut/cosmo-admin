import Categories from "../components/CategoriesComponents/Categories";
import Dashboard from "../components/DashboardComponents/Dashboard";
import Market from "../components/MarketComponents/Market";
import Orders from "../components/OrdersComponents/Orders";
import Products from "../components/ProductsComponents/Products";
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

export const websiteAddress = "https://cosmo-market.ro"

export const pages = [
    {
        component: Dashboard,
        name: 'Dashboard',
        path: '/dashboard',
    },
    {
        component: Categories,
        name: 'Categorii',
        path: '/categorii',
    },
    {
        component: Products,
        name: 'Produse',
        path: '/produse',
    },
    {
        component: Orders,
        name: 'Comenzi',
        path: '/comenzi',
    },
    {
        component: Users,
        name: 'Utilizatori',
        path: '/utilizatori',
    },
    {
        component: Market,
        name: 'Magazin',
        path: '/magazin',
    },
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
