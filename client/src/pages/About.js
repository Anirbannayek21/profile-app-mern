import { Dialog, DialogTitle } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { DialogContent } from '@material-ui/core'
import { Box, Container, Grid, makeStyles, Paper, Typography, Button, TableContainer, Table, TableRow, TableCell, TableBody, Divider } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import profile from "../img/profile.svg"
import LinkIcon from '@material-ui/icons/Link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { userContext } from '../App'

const img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "max-content",
        padding: theme.spacing(7),
        [theme.breakpoints.up('md')]: {
            height: "100vh",
            padding: theme.spacing(0),
        },
        backgroundColor: theme.palette.grey[300],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        boxShadow: theme.shadows[20],
        width: "80%",
        height: "max-content",
        padding: theme.spacing(5),
        paddingTop: theme.spacing(10),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(5),
        }
    },
    header: {
        fontSize: "20px",
        fontWeight: "bold"
    },
    btn: {
        backgroundColor: grey[300],
    },
    table: {
        borderBottom: "none",
    },
    img: {
        borderRadius: "20%",
        width: "150px", height: "150px",
        objectFit: "cover",
        display: "block",
        marginBottom: "5px",
        border: "2px solid black"
    },
    link: {
        textDecoration: "none",
        fontSize: "20px",
        margin: "5px",
        color: theme.palette.common.black
    }
}))

const About = () => {
    const classes = useStyles();
    const history = useHistory();
    const [data, setdata] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        profilePic: "",
        social: []
    })
    const [open, setopen] = useState(false)
    const [open1, setopen1] = useState(false)

    const [profileImg, setprofileImg] = useState()

    const { state, dispatch } = useContext(userContext)

    const loadData = async () => {
        await axios.get('/user/about', {
            withCredentials: true
        }).then((result) => {
            dispatch({ type: "USER", payload: true })
            const { email, name, phone, work, profilePic, social } = result.data;
            setdata({ ...data, name, email, phone, work, profilePic, social })
        }).catch((error) => {
            console.log(error)
            history.push('/signin')
        })

    }
    useEffect(() => {
        loadData();
    }, [data])

    const addImg = async () => {
        const formdata = new FormData();
        formdata.append("profilePic", profileImg)

        await axios.post('/user/addpic', formdata).then((result) => {
            toast.success(result.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
            });
            setopen(false)
        }).catch((error) => toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
        }))

    }

    const [socialName, setsocialName] = useState("")
    const [link, setlink] = useState("")
    let [socialData, setsocialData] = useState([])

    const addSocial = () => {
        if (socialName !== "") {
            if (socialData.filter(item => item.socialName === socialName).length === 0) {
                socialData.push({ socialName, link })
                setsocialData(socialData)
            }
        }
        console.log(socialData);
        axios.post("/user/addsocial", socialData)
            .then((result) => {
                setopen1(false)
                setsocialData([])
                setsocialName("")
                setlink("")
            }).catch((error) => console.log(error))
    }

    const addSocialLink = () => {
        if (socialData.filter(item => item.socialName === socialName).length === 0) {
            socialData.push({ socialName, link })
            setsocialData(socialData)
        }
        console.log(socialData);
        setsocialName("")
        setlink("")
    }

    return (
        <Container maxWidth className={classes.root}>
            <Paper className={classes.box}>
                <Grid container>
                    <Grid item md={3} lg={3} >
                        <Box align="center" >
                            <img src={data.profilePic === undefined ? `./uploads/onone.png` : `./uploads/${data.profilePic}`} className={classes.img} alt="profile pic" />
                            <Button variant="contained" color="transparent" onClick={() => setopen(true)}>change image</Button>
                        </Box>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Typography variant="h5">Anirban Nayek</Typography>
                        <Typography variant="subtitle2" color="primary">{data.work}</Typography>
                    </Grid>
                    <Grid item xs={12} md={2} lg={2}>
                        <Button variant="contained" className={classes.btn} onClick={() => setopen1(true)} >ADD social </Button>
                    </Grid>
                </Grid>
                <Grid container component={Box} mt={2}>
                    <Grid item xs={12} md={3} lg={3} style={{ display: "flex", flexDirection: 'column' }}>
                        <Typography className={classes.header}>Social Media</Typography>
                        <Divider />
                        {
                            data.social.map((value) => (
                                value.link !== "" ? <Typography className={classes.link} component="a" href={value.link} target="_blank">{value.socialName}<LinkIcon /></Typography> : <Typography className={classes.link} >{value.socialName}</Typography>
                            ))
                        }
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography className={classes.header}>About</Typography>
                        <Divider />
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow >
                                        <TableCell className={classes.table}>Name</TableCell>
                                        <TableCell className={classes.table}><Typography color="primary">{data.name}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classes.table}>Email</TableCell>
                                        <TableCell className={classes.table}><Typography color="primary">{data.email}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classes.table}>Phone Number</TableCell>
                                        <TableCell className={classes.table}><Typography color="primary">{data.phone}</Typography></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell className={classes.table}>Profession</TableCell>
                                        <TableCell className={classes.table}><Typography color="primary">{data.work}</Typography></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} lg={3}>
                        <img src={profile} alt="profile pic" width="100%" />
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={() => setopen(false)}>
                    <DialogTitle>Add profile Picture</DialogTitle>
                    <DialogContent >
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addImg()
                        }} encType="multipart/form-data">
                            <TextField
                                type="file"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Add profile pic"
                                onChange={(e) => setprofileImg(e.target.files[0])}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />

                            <br />
                            <Button variant="contained" color="primary" type="submit">SAVE</Button>
                            <br />
                        </form>
                    </DialogContent>
                </Dialog>
                <Dialog open={open1} onClose={() => setopen1(false)}>
                    <DialogTitle>Add Social Handles</DialogTitle>
                    <DialogContent>
                        <Grid container >
                            <Grid item md={3} lg={3} sm={6}>
                                <Box mx={1}>
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        label="1st skill"
                                        value={socialName}
                                        onChange={(e) => setsocialName(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item md={9} lg={9} sm={6}>
                                <Box mx={1}>
                                    <TextField
                                        variant="filled"
                                        margin="normal"
                                        fullWidth
                                        label="1st skill link"
                                        value={link}
                                        onChange={(e) => setlink(e.target.value)}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <br />
                        <Button component={Box} variant="contained" color="primary" onClick={(e) => { e.preventDefault(); addSocialLink() }} display={(socialName === "") ? "none" : null}>Add More</Button>
                        <Button component={Box} ml={1} variant="contained" color="primary" onClick={(e) => { e.preventDefault(); addSocial() }}>SAVE</Button>
                        <br />
                    </DialogContent>
                </Dialog>
            </Paper >
            <ToastContainer />
        </Container >
    )
}

export default About
