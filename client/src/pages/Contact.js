import { InputAdornment } from '@material-ui/core'
import { Box, Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { useContext } from 'react';
import { userContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "max-content",
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            height: "100vh",
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
        backgroundColor: theme.palette.grey[300],
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    box: {
        boxShadow: theme.shadows[20],
        width: "80%",
        height: "max-content",
        padding: theme.spacing(1)
    },
    data: {
        display: "flex",
        justifyContent: "space-evenly",
        textAlign: "left"
    },
    mb: {
        width: "80%",
        [theme.breakpoints.up("sm")]: {
            width: "60%"
        }
    },
    title: {
        fontSize: "40px",
        fontWeight: "bold"
    },
    btn: {
        fontWeight: "bold"
    }
}))

const Contact = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(userContext)
    const loadData = async () => {
        axios.get('/user/about', {
            withCredentials: true
        }).then((result) => {
            dispatch({ type: "USER", payload: true })
            setuserData({ ...userData, name: result.data.name, email: result.data.email, phone: result.data.phone })
        })
    }
    const history = useHistory();

    useEffect(() => {
        loadData();
    }, [])

    const sendData = async (e) => {
        e.preventDefault();

        await axios.post("/user/contact", userData).then((result) => {
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            setuserData({ ...userData, message: "" })
        }
        ).catch(async (error) => {
            await toast.info(error.response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            setTimeout(() => { history.push("/signin") }, 2000)
        })

    }
    const [userData, setuserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    return (
        <Container maxWidth className={classes.root}>
            <Paper className={classes.box} Align="center">
                <Typography className={classes.title} variant="h6">Get in Touch</Typography>
                <Box>
                    <Grid container className={classes.data}>
                        <Grid item lg={3} md={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                placeholder="Name"
                                variant="outlined"
                                onChange={(e) => setuserData({ ...userData, name: e.target.value })}
                                value={userData.name}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon color="primary" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                placeholder="Email"
                                value={userData.email}
                                onChange={(e) => setuserData({ ...userData, email: e.target.value })}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="primary" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={3}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Phone"
                                placeholder="phone"
                                value={userData.phone}
                                onChange={(e) => setuserData({ ...userData, phone: e.target.value })}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon color="primary" />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        className={classes.mb}
                        margin="normal"
                        multiline
                        rows={10}
                        label="Message"
                        value={userData.message}
                        onChange={(e) => setuserData({ ...userData, message: e.target.value })}
                        placeholder="Message"
                        variant="outlined"

                        InputLabelProps={{
                            shrink: true
                        }}
                    />

                </Box>
                <Button
                    disabled={
                        (userData.name === "" || userData.email === "" || userData.phone === "" || userData.message === "") ? true : false
                    }
                    onClick={(e) => sendData(e)}
                    component={Box} mt={5} mb={2}
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                >
                    Send Message
                    </Button>
            </Paper>
            <ToastContainer />
        </Container>
    )
}

export default Contact
