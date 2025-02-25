import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = ({showLogin, handleClick, handleLogOut}) => {
  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
      color: 'white',
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Link to='/' className={classes.title}><h1>NewsApp!</h1></Link>
        {showLogin && <Button onClick={handleClick} color="inherit">Login</Button>}
        {!showLogin && <Button onClick={handleLogOut} color="inherit">Logout</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;