import logo from '../../assets/logo-app-bar-cosmo-market.svg';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, capitalize, Grid, IconButton, Link, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { isEmpty, useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AdminDrawer from './AdminDrawer';



const useStyles = makeStyles((theme) => ({
    logo: {
        height: 45,
        // margin: theme.spacing()
        // flexGrow: 1,
    },
    // toolbar: {
    //     display: 'flex',
    //     alignContent: 'center',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     [theme.breakpoints.down(400)]: {
    //         justifyContent: 'center',
    //     },
    //     padding: theme.spacing(),
    // },
    button: {
        padding: theme.spacing(1, 3),
        textTransform: 'none',
    },
    label: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const profile = useSelector(state => state.firebase.profile)
    const auth = useSelector(state => state.firebase.auth)
    const history = useHistory()
    const firebase = useFirebase()

    const [isOpen, setIsOpen] = useState(false)

    const logout = () => {
        firebase.logout()
    }

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {!isEmpty(auth) && <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>}
                    <div style={{ flexGrow: 1 }} />
                    <Link href='/dashboard' >
                        <img src={logo} alt='logo' className={classes.logo} />
                    </Link>
                    <div style={{ flexGrow: 1 }} />
                    {!isEmpty(auth) && <Button color='inherit' onClick={logout}>Deconectare</Button>}
                </Toolbar>
            </AppBar>
            <AdminDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}


