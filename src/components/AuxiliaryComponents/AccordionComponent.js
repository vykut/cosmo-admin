import { Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    accordion: {
        borderStyle: 'solid',
        borderColor: '#e0e0e3',
        borderWidth: '1px',
    }
}))

export default function AccordionComponent({ children, title, expanded, onChange }) {
    const classes = useStyles()

    return (
        <Accordion elevation={0} expanded={expanded} onChange={onChange} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='h6'>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
