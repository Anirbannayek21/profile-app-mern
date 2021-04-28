import React, { useState, useContext } from 'react'
import { Box, Button, Container, Grid, InputAdornment, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import Img from "../img/programming.svg"
import { cyan } from '@material-ui/core/colors'
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkIcon from '@material-ui/icons/Work';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userContext } from '../App';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "max-content",
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7),
        [theme.breakpoints.up('md')]: {
            height: "100vh",
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
        backgroundColor: theme.palette.grey[300],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        boxShadow: theme.shadows[20],
        width: "80%",
        height: "max-content"
    },
    content: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(10),
        }
    },
    img: {
        paddingLeft: theme.spacing(3),
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


const Signup = () => {
    const history = useHistory();
    const defaultData = {
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    }
    const classes = useStyles();
    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const [userData, setuserData] = useState(defaultData)
    const { state, dispatch } = useContext(userContext)

    const submitData = async () => {
        axios.post("/user/register", userData).then((result) => {
            dispatch({ type: "USER", payload: true })
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
            })
            history.push("/")
        }).catch((error) => {
            if (error.response.status === 401) {
                toast.warning(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                })
            }
            else if (error.response.status === 400 || error.response.status === 422) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                })
            }
        })


        setuserData(defaultData)
        setshow(false)
        setshow1(false)
    }
    return (
        <Container maxWidth className={classes.root}>
            <Paper className={classes.box}>
                <Grid container>
                    <Grid item sm={6} lg={6} md={6} className={classes.img} >
                        <Typography component="img" width="100%" src={Img} alt="signup image"></Typography>
                    </Grid>
                    <Grid item sm={6} lg={6} md={6}>
                        <Box className={classes.content} component="form" onSubmit={(e) => { e.preventDefault(); submitData() }}>
                            <Typography variant="h6" className={classes.title}>Sign Up</Typography>
                            <TextField
                                margin="normal"
                                variant="standard"
                                placeholder="Enter Your Name"
                                value={userData.name}
                                onChange={(e) => setuserData({ ...userData, name: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
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
                                autoComplete="off"
                                variant="standard"
                                placeholder="Enter Your Phone Number"
                                value={userData.phone}
                                onChange={(e) => setuserData({ ...userData, phone: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                margin="normal"
                                variant="standard"
                                placeholder="Enter Your profession"
                                value={userData.work}
                                onChange={(e) => setuserData({ ...userData, work: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <WorkIcon />
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
                            <TextField
                                margin="normal"
                                variant="standard"
                                placeholder="Confirm Password"
                                value={userData.cpassword}
                                type={show ? "text" : "password"}
                                onChange={(e) => setuserData({ ...userData, cpassword: e.target.value })}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment>
                                            <Button onClick={() => setshow(!show)} className={classes.shw}>{show ? <VisibilityOffIcon /> : <VisibilityIcon />}</Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button type="submit" className={classes.btn} variant="contained">sign Up</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <ToastContainer />
        </Container>
    )
}

export default Signup
