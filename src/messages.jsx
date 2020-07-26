/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Message } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import EmptyMessage from './emptyMessage';
import { getMessages } from './api';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
});

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    const { setTitle, history } = this.props;

    setTitle('Messages');

    const refresh = () => getMessages().then((resp) => {
      if (resp.status === 403) {
        history.push('/login');
      } else {
        resp.json().then((messages) => {
          this.setState({
            messages: messages.map((message) => ({
              ...message,
              duration: moment
                .duration(
                  new Date() - new Date(message.timestamp),
                )
                .humanize(),
            })),
          });
        });
      }
    });

    this.refreshInterval = setInterval(refresh, 5000);
    refresh();
  };

  componentWillUnmount = () => {
    clearInterval(this.refreshInterval);
  };

  render() {
    const { classes } = this.props;
    const { messages } = this.state;

    return (
      <Paper className={classes.root}>
        <EmptyMessage coll={messages}>
          No messages
        </EmptyMessage>
        <List component="nav">
          {messages.map((message) => (
            <ListItem
              key={message.id}
              component={Link}
              to={`/messages/${message.id}`}
            >
              <ListItemAvatar>
                <Avatar>
                  <Message />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.fromName}
                secondary={`${message.duration} ago`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(Messages);
