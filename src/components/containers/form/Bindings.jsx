import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IconButton, Button, Textfield, Checkbox} from 'react-mdl';
import serialize from 'form-serialize';

import * as Actions from '../../../actions/form';

class BindingsForm extends Component {
  constructor(props) {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      mounts: props.mounts
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({
      mounts: [...this.state.mounts, {
        Destination: '',
        Mode: '',
        Propagation: '',
        RW: true,
        Source: ''}]
    });
  }

  handleClose(i) {
    const newState = Object.assign({}, this.state);
    newState.mounts.splice(i, 1);
    this.setState(newState);
  }

  handleSubmit(e) {
    const form = serialize(this.form, { hash: true });
    e.preventDefault();
    this.props.updateMounts(form);
  }

  render() {
    // const {
      // fields: {HostConfig},
      // handleSubmit,
      // resetForm,
      // submitting
      // } = this.props;
    const {mounts} = this.state;

    return (
      <form ref={c => this.form = c} onSubmit={this.handleSubmit}>
        <table style={{width: '100%'}}>
          <tbody>
            {mounts && mounts.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Textfield name={`${i}[]`} defaultValue={item.Source} label="Host Volume" />
                  </td>
                  <td>
                    <Textfield name={`${i}[]`} defaultValue={item.Destination} label="Cotainer Volume" />
                  </td>
                  <td style={{width: '100px'}}>
                    <Checkbox name={`${i}[]`} label="Read Only" ripple defaultChecked={item.Mode === 'ro'} />
                  </td>
                  <td>
                    <IconButton name="close" colored onClick={this.handleClose.bind(this, i)} />
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
        <Button raised ripple onClick={this.handleAdd}>Add</Button>
        <Button raised accent ripple type="submit">Commit and Restart</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BindingsForm);
