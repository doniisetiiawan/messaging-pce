import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  message: { textAlign: 'center' },
});

const EmptyMessage = ({ coll, children, classes }) => (coll.length === 0 ? (
  <Typography className={classes.message} color="primary">
    {children}
  </Typography>
) : null);

export default withStyles(styles)(EmptyMessage);

EmptyMessage.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  coll: PropTypes.arrayOf(PropTypes.object).isRequired,
};
