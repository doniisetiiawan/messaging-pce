/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Delete, Replay } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { deleteMessage, getMessage } from './api';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  message: {
    margin: theme.spacing(),
  },
  button: {
    margin: theme.spacing(),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
});

class MessageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: {},
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    const {
      match: {
        params: { id },
      },
      setTitle,
      history,
    } = this.props;

    getMessage(id).then((resp) => {
      if (resp.status === 403) {
        history.push('/login');
      } else {
        resp.json().then((message) => {
          setTitle(`Message from ${message.fromName}`);
          this.setState({ message });
        });
      }
    });
  };

  onDeleteClick = () => {
    const {
      history,
      match: {
        params: { id },
      },
    } = this.props;

    deleteMessage(id).then(() => {
      history.push('/messages');
    });
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    const { onDeleteClick } = this;

    return (
      <Paper className={classes.root}>
        <Typography className={classes.message}>
          {message.message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          to={`/newmessage/${message.from}`}
        >
          Reply
          <Replay className={classes.rightIcon} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onDeleteClick}
        >
          Delete
          <Delete className={classes.rightIcon} />
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(MessageDetails);
