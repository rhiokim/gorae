import React from 'react';
import {connect} from 'react-redux';
import {Snackbar} from 'react-mdl';

class Notifier extends React.Component {
  constructor(props) {
    super(props);

    this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);

    this.state = {
      isSnackbarActive: false
    };
  }

  handleTimeoutSnackbar() {
   this.setState({isSnackbarActive: false});
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      isSnackbarActive: true
    })
  }

  render() {
    const {isSnackbarActive} = this.state;
    const {error} = this.props;
    return (
      <Snackbar
        active={isSnackbarActive}
        timeout={error.timeout || 5000}
        onTimeout={this.handleTimeoutSnackbar}>
          {error.message}
      </Snackbar>
    );
  }
}

const mapStateToProps = state => ({
  error: state.notifierReducer.error
});

export default connect(mapStateToProps, null)(Notifier);
