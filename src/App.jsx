import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {
  ContactMail as ContactsIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from './home';
import Contacts from './contacts';
import Login from './login';
import { logout } from './api';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Messege App',
      drawer: false,
    };
  }

  setTitle = (title) => {
    this.setState((state) => ({
      ...state,
      title,
    }));
  };

  toggleDrawer = () => {
    this.setState((state) => ({
      ...state,
      drawer: !state.drawer,
    }));
  };

  onLogoutClick = () => {
    logout().then(() => {
      window.location.reload();
    });
  };

  render() {
    const { classes } = this.props;
    const { title, drawer } = this.state;
    const { setTitle, toggleDrawer, onLogoutClick } = this;

    return (
      <Router>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>

              <Drawer open={drawer} onClose={toggleDrawer}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={toggleDrawer}
                  onKeyDown={toggleDrawer}
                >
                  <div>
                    <List>
                      <ListItem
                        button
                        component={Link}
                        to="/"
                      >
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/contacts"
                      >
                        <ListItemIcon>
                          <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contacts" />
                      </ListItem>
                      <ListItem
                        button
                        component={Link}
                        to="/messages"
                      >
                        <ListItemIcon>
                          <MessageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Messages" />
                      </ListItem>
                    </List>
                  </div>
                </div>
              </Drawer>

              <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}
              >
                {title}
              </Typography>
              <Button
                color="inherit"
                onClick={onLogoutClick}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} {...{ setTitle }} />
              )}
            />
            <Route
              exact
              path="/contacts"
              render={(props) => (
                <Contacts {...props} {...{ setTitle }} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <Login {...props} {...{ setTitle }} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
