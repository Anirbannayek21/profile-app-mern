import { Button, Container, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';
import Img from "../img/lost.svg"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100hw",
        height: "100vh",
        backgroundColor: theme.palette.grey[300],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    box: {
        width: "60%",
        height: "60%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }
}))
const Error = () => {
    const classes = useStyles();
    const history = useHistory();
    console.log(history)
    return (
        <Container maxWidth className={classes.root}>
            <Paper className={classes.box} align="center">
                <img src={Img} width="30%" />
                <Typography gutterBottom variant="h3" color="secondary">Page Not Found</Typography>
                <Button onClick={() => history.push('/')} variant="outlined" color="primary">Go to home</Button>
            </Paper>
        </Container>
    )
}

export default Error
