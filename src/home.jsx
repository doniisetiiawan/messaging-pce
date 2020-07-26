/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ContactMail, Message } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EmptyMessage from './emptyMessage';
import { getContacts } from './api';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    const { setTitle, history } = this.props;

    setTitle('Barely SMS');

    const refresh = () => getContacts().then((resp) => {
      if (resp.status === 403) {
        history.push('/login');
      } else {
        resp.json().then((contacts) => {
          this.setState({
            contacts: contacts.filter(
              (contact) => contact.online,
            ),
          });
        });
      }
    });

    this.refreshInterval = setInterval(refresh, 5000);
    refresh();
  };

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  onMessageClick = (id) => () => {
    this.props.history.push(`/newmessage/${id}`);
  };

  render() {
    const { classes } = this.props;
    const { contacts } = this.state;
    const { onMessageClick } = this;

    return (
      <Paper className={classes.root}>
        <EmptyMessage coll={contacts}>
          No contacts online
        </EmptyMessage>

        <List component="nav">
          {contacts.map((contact) => (
            <ListItem key={contact.id}>
              <ListItemAvatar>
                <Avatar>
                  <ContactMail />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={onMessageClick(contact.id)}
                >
                  <Message />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Home);

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
