import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundImage: 'url(https://wallpaperaccess.com/full/2068754.jpg)',
        height: '90vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        fontSize: '50px',
        color: 'white',
        fontWeight: 'bold'
    },

});

function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            WELCOME TO MERN POSTS APP
        </div>
    );
}

export default Home;