import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions/container';

class Changes extends React.Component {
  componentWillMount() {
    this.props.fetchContainerChanges(this.props.id);
  }

  render() {
    const {changes} = this.props;
    return (
      <fieldset className="content-group mt-30">
        <legend className="text-bold">Changes <small className="text-muted">- container’s filesystem</small></legend>
        <table className="table table-framed">
          <thead>
            <tr>
              <th>Path</th>
              <th>Kind</th>
            </tr>
          </thead>
          <tbody>
          {changes.map((change, i) => {
            return <tr key={i}>
              <td>{change.Path}</td>
              <td>{change.Kind}</td>
            </tr>
          })}
          </tbody>
        </table>
      </fieldset>
    );
  }
}

const mapStateToProps = state => ({
  changes: state.containerReducer.changes
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Changes);
