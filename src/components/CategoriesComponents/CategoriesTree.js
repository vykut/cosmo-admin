import { Collapse, fade, makeStyles, SvgIcon, withStyles } from '@material-ui/core';
import { TreeItem, TreeView } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { isEmpty } from 'react-redux-firebase';
import { useCategoryContext } from './CategoryContext/CategoryContext';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import { useHistory, useLocation, useParams } from 'react-router-dom';


function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
}))((props) => <TreeItem {...props} TransitionComponent={Collapse} />);

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
});

export default function CategoriesTree() {
    const classes = useStyles();
    const categoryContext = useCategoryContext()
    const history = useHistory()
    const { categoryID } = useParams()
    const [nodes, setNodes] = useState(['1'])

    useEffect(() => {
        if (categoryID && !isEmpty(categoryContext.categories)) {
            setNodes(['1', ...categoryContext.categories[categoryID].parentCategories, categoryID])
        }
    }, [categoryContext.categories, categoryID])

    const nodeSelected = (e, value) => {
        if (value === '1')
            return history.push('/categorii/')

        const addCategory = value.split('-')
        if (addCategory[1]) {
            history.push(`/categorii/${addCategory[0]}/adauga-subcategorie/`)
            setNodes([...nodes, value])
        } else {
            history.push(`/categorii/${addCategory[0]}/detalii/`)
        }
    }

    const toggleNodes = (e, nodes) => {
        setNodes(nodes)
    }

    function CategoryTree(categoryID, category) {
        if (category) {
            return (
                <StyledTreeItem nodeId={categoryID} label={category.name} key={categoryID}>
                    {!isEmpty(category.childrenCategories) && category.childrenCategories.map((categoryID) => {
                        return CategoryTree(categoryID, categoryContext.categories[categoryID])
                    })}
                    <StyledTreeItem nodeId={`${categoryID}-addCategory`} label='Adaugă subcategorie' key={`${categoryID}-addCategory`} endIcon={<AddBoxIcon color='primary' />} />
                </StyledTreeItem>
            )
        }
    }

    return (
        <TreeView
            className={classes.root}
            expanded={nodes}
            onNodeToggle={toggleNodes}
            defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
            defaultExpandIcon={<AddBoxOutlinedIcon />}
            defaultEndIcon={<CloseSquare />}
            onNodeSelect={nodeSelected}
        >
            <StyledTreeItem nodeId="1" label="Categorii">
                {!isEmpty(categoryContext.mainCategories) && !isEmpty(categoryContext.categories) && Object.entries(categoryContext.mainCategories).map((category) => {
                    return CategoryTree(category[0], categoryContext.categories[category[0]])
                })}
            </StyledTreeItem>
        </TreeView>
    )
}
