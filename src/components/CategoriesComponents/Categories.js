import { Grid } from '@material-ui/core'
import React from 'react'
import CategoryDetails from './CategoryDetails'
import CategoriesTree from './CategoriesTree'
import PageContainer from '../AuxiliaryComponents/PageContainer'


export default function Categories({ children, ...props }) {
    return (
        <PageContainer {...props}>
            <Grid container spacing={4}>
                <Grid item md={4} sm>
                    <CategoriesTree />
                </Grid>
                <Grid item md={8} sm>
                    {children}
                </Grid>
            </Grid>
        </PageContainer>
    )
}
