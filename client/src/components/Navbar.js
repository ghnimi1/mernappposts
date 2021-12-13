import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { fetchCurrentUser } from '../redux/actions/userActions/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        color: 'white',
        backgroundColor: '#264653',
        borderBottom: '2px solid rgba(34,36,38,.15)'
    }
}));

export default function Navbar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { currentUser } = useSelector(state => state.users)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.replace('/login')
    }
    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [currentUser])
    return (
        <div className={classes.root}>

            <AppBar position="static"
                className={classes.appbar}
            >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" className={classes.title} >
                        <ListItem component={Link} to='/accueil' style={{
                            color: 'white',
                            textDecoration: 'none'
                        }} >
                            Posts
                        </ListItem>
                    </Typography>

                    {token && (
                        <div style={{
                            display: 'flex'
                        }}>
                            <h5>{currentUser?.name}</h5>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <ListItem component={Link} to={`/${currentUser?.userId}/profile`}
                                    style={{ textDecoration: 'none' }}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </ListItem>
                                <ListItem component={Link} onClick={() => {
                                    handleClose()
                                    Logout()
                                }}>
                                    Logout
                                </ListItem>
                            </Menu>
                        </div>
                    )}
                    {!token && (
                        <Link to='login'
                            style={{ textDecoration: 'none' }}>
                            <Button variant='contained' color="primary">Login</Button>
                        </Link>

                    )}
                </Toolbar>
            </AppBar>
        </div >
    );
}
