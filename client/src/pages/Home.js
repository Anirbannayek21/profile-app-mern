import { Box, Container, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { cyan } from '@material-ui/core/colors';
import axios from 'axios';
import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { userContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100hw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        width: "80%",
        [theme.breakpoints.up('sm')]: {
            width: "60%",
        }
    },
    bg: {
        position: 'absolute',
        left: 0,
        width: "50vw",
        height: "100vh",
        backgroundColor: cyan[100],
    },
    bg1: {
        width: "50vw",
        height: "100vh",
    }
}))
const Home = () => {
    const { state, dispatch } = useContext(userContext)
    const classes = useStyles();
    const [name, setname] = useState("")
    useEffect(async () => {
        const data = await axios.get("/user/about", {
            withCredentials: true
        })
        if (data) {
            dispatch({ type: 'USER', payload: true })
        }
        setname(data.data.name)
    }, [])

    return (
        <Container maxWidth className={classes.root}>
            <Toolbar></Toolbar>
            <Grid item className={classes.bg}></Grid>
            <Grid item className={classes.bg1}></Grid>
            <Box className={classes.box} align="center" position="absolute">
                {name !== "" ? <Typography variant="h4" color="secondary">Hello, {name}</Typography> : null}
                <Typography gutterBottom variant="h2" color="secondary" >Welcome to my website</Typography>
                <Typography variant="subtitle2">This is my first mern project. I use reactjs , nodejs, mongoDB, metarial Ui .Here User can store there skills , personal details.I tried to give good UI by the font-end.I gie my best make it as pretty as possible.Thank you so much for coming here.</Typography>
            </Box>
        </Container >
    )
}

export default Home
