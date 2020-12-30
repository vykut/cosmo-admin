import { Box, Drawer, List, ListItem, ListItemText, makeStyles, Toolbar } from '@material-ui/core'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { pages } from '../../utils/utils'

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 180,
        backgroundColor: '#f7ffff'
    },
}))

export default function AdminDrawer({ isOpen, setIsOpen }) {
    const classes = useStyles()
    const history = useHistory()

    const handleClick = (path) => () => {
        history.push(path)
        setIsOpen(false)
    }

    return (
        <>
            <Drawer
                variant='persistent'
                anchor="left"
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <List>
                    {pages.map((item, index) => {
                        return <ListItem button onClick={handleClick(item.mainPath)} key={item.title}>
                            <ListItemText color='primary'>
                                {/* <Box fontWeight='fontWeightMedium'> */}
                                {item.title}
                                {/* </Box> */}
                            </ListItemText>
                        </ListItem>
                    })}
                </List>
            </Drawer>
        </>
    )
}
