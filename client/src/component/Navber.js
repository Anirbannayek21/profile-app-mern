import { AppBar, Box, Button, List, Hidden, IconButton, ListItem, ListItemText, makeStyles, SwipeableDrawer, Toolbar, Typography, Divider } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { userContext } from '../App';

const useStyles = makeStyles((theme) => ({
    nav: {
        boxShadow: theme.shadows[0]
    },
    title: {
        letterSpacing: "15px",
        fontSize: "30px",
        fontWeight: "bold",
        flexGrow: 1,
        marginLeft: "5px"
    },
    btn: {
        fontWeight: 600,
        marginLeft: "10px",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    ac: {
        backgroundColor: theme.palette.grey[700],
        color: theme.palette.common.white,
        "&:hover": {
            backgroundColor: theme.palette.grey[700]
        }
    }
}))



const Navber = () => {
    const { state, dispatch } = useContext(userContext)

    const classes = useStyles();
    const [open, setopen] = useState(false)
    return (
        <AppBar color="transparent" className={classes.nav}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        edge="start"
                        onClick={() => setopen(true)}>
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer open={open} onClose={() => setopen(false)} >
                        <List component={Box} width="300px">
                            <ListItem button onClick={() => setopen(false)} component={NavLink} to="/">
                                <ListItemText primary={<Typography variant="h6" color="secondary">TITLE</Typography>} />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/"  >
                                <ListItemText primary="Home" />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/about" >
                                <ListItemText primary="About Us" />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/contact" >
                                <ListItemText primary="Contact Us" />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/signin" >
                                <ListItemText primary="Sign In" />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/signup" >
                                <ListItemText primary="Sign Up" />
                            </ListItem>
                            <Divider />
                            <ListItem button exact activeClassName={classes.ac} onClick={() => setopen(false)} component={NavLink} to="/logout" >
                                <ListItemText primary="log out" />
                            </ListItem>
                            <Divider />
                        </List>
                    </SwipeableDrawer>
                </Hidden>
                <Typography className={classes.title} variant="h6">TITLE</Typography>
                <Hidden smDown>
                    <Box>
                        <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/">Home</Button>
                        <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/about">About Us</Button>
                        <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/contact">Contact Us</Button>
                        {state !== true ?
                            <>
                                <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/signin">Sign in</Button>
                                <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/signup">sign up</Button>
                            </> :
                            <Button className={classes.btn} exact activeClassName={classes.ac} color="transparent" component={NavLink} to="/logout">log out</Button>}
                    </Box>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default Navber
