import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar
}));

  export default function Sidenav({loggedIn, searchTerm, handleChange, redirectSubmit, setRedirectSubmit}){

  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      
      <List>
        <br/>
        <ListItem component={Link} to="/" button key={"All Headlines"}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary={"All Headlines"} />
        </ListItem>
      
      </List>
      <Divider />
      <List>
        {loggedIn ?
          <>
          <ListItem component={Link} to="/my-headlines" button key={"My Headlines"} >
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={"My Headlines"} />
          </ListItem>

          <ListItem component={Link} to='/user-sources' button key={"Edit Favourite Sources"} >
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary={"Edit Fav Sources"} />
          </ListItem>
          <Divider />
          </>
        :
          ''
        }
    
      </List>
      <List>
        <SearchForm searchTerm={searchTerm} handleChange={handleChange} redirectSubmit={redirectSubmit} setRedirectSubmit={setRedirectSubmit} />
      </List>
    </Drawer>

  );
}

