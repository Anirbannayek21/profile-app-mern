import React, { useContext, useState } from 'react'
import { Box, Button, Container, Grid, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import Img from "../img/react.svg"
import { cyan } from '@material-ui/core/colors'
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { userContext } from '../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.grey[300],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        overflow: 'visible'
    },
    box: {
        boxShadow: theme.shadows[20],
        width: "80%",
        height: "max-content",
        padding: theme.spacing(5),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(10),
            width: "60%",
        }
    },
    left: {
        margin: "auto"
    },
    content: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(10),
        }
    },
    img: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: "30px"
    },
    btn: {
        width: "100px",
        marginTop: theme.spacing(3),
        backgroundColor: cyan[300],
        fontWeight: "bold"
    },
    shw: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}))

const defaultData = {
    email: "",
    password: "",
}

const Signin = () => {
    const classes = useStyles();
    const [show1, setshow1] = useState(false);
    const [userData, setuserData] = useState(defaultData)
    const history = useHistory();
    const { state, dispatch } = useContext(userContext)

    const logindata = async (e) => {
        e.preventDefault();
        await axios.post('/user/login', userData).then((result) => {
            dispatch({ type: "USER", payload: true })
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            setuserData(defaultData);
            setshow1(false);
            setTimeout(() => { history.push("/") }, 1000)
        }).catch((error) => toast.error(error.response.data.error, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
        }))

    }
    return (
        <Container maxWidth className={classes.root}>
            <Paper className={classes.box}>
                <Grid container>
                    <Grid item sm={6} lg={6} md={6} className={classes.left}>
                        <Box className={classes.content} component="form" onSubmit={logindata}>
                            <Typography variant="h6" className={classes.title}>Sign In</Typography>
                            <TextField
                                margin="normal"
                                variant="standard"
                                placeholder="Enter Your Email"
                                value={userData.email}
                                onChange={(e) => setuserData({ ...userData, email: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                margin="normal"
                                variant="standard"
                                placeholder="Enter Your Password"
                                type={show1 ? "text" : "password"}
                                value={userData.password}
                                onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button onClick={() => setshow1(!show1)} className={classes.shw}>{show1 ? <VisibilityOffIcon /> : <VisibilityIcon />}</Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button type="submit" className={classes.btn} variant="contained">sign In</Button>
                        </Box>
                    </Grid>
                    <Grid item sm={6} lg={6} md={6} className={classes.img} >
                        <Typography component="img" width="100%" src={Img} alt="signup image"></Typography>
                    </Grid>
                </Grid>
            </Paper>
            <ToastContainer />
        </Container>
    )
}

export default Signin
