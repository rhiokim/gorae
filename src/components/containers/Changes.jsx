import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions/container';

class Changes extends Component {
  componentWillMount() {
    this.props.fetchContainerChanges(this.props.id);
  }

  renderActiveTabContent() {}

  render() {
    return (
      <div>
        {JSON.stringify(this.props.changes, null, 2)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  changes: state.containerReducer.changes
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Changes);
