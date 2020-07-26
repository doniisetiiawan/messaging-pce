/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Send } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import { getUser, postMessage } from './api';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  button: {
    margin: theme.spacing(),
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
});

class NewMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
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

    getUser(id).then((resp) => {
      if (resp.status === 403) {
        history.push('/login');
      } else {
        resp.json().then((user) => {
          setTitle(`New message for ${user.name}`);
        });
      }
    });
  };

  onMessageChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  onSendClick = () => {
    const {
      match: {
        params: { id },
      },
      history,
    } = this.props;
    const { message } = this.state;

    postMessage({ to: id, message }).then(() => {
      this.setState({ message: '' });
      history.push('/');
    });
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;
    const { onMessageChange, onSendClick } = this;

    return (
      <Paper className={classes.root}>
        <TextField
          id="multiline-static"
          label="Message"
          multiline
          rows="4"
          className={classes.textField}
          margin="normal"
          value={message}
          onChange={onMessageChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onSendClick}
        >
          Send
          <Send className={classes.rightIcon} />
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(NewMessage);
