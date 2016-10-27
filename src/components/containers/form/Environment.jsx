import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {IconButton, Button, Textfield} from 'react-mdl';
import serialize from 'form-serialize';

import * as Actions from '../../../actions/form';

class EnvironmentsForm extends Component {
  constructor(props) {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      env: props.env
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({
      env: [...this.state.env, '=']
    });
  }

  handleClose(i) {
    const newState = Object.assign({}, this.state);
    newState.env.splice(i, 1);
    this.setState(newState);
  }

  handleSubmit(e) {
    let form = serialize(this.form, { hash: true });
    let key;
    let data = [];
    // form = form.map(item => {
      // return item.join('=')
    // });
    for (key in form) {
      if ({}.hasOwnProperty.call(form, key)) {
        data.push(form[key].join('='));
      }
    }
    e.preventDefault();
    this.props.updateEnv(data);
  }

  render() {
    // const {
      // fields: {HostConfig},
      // handleSubmit,
      // resetForm,
      // submitting
      // } = this.props;
    const {env} = this.state;

    return (
      <form ref={c => this.form = c} onSubmit={this.handleSubmit}>
        <table style={{width: '100%'}}>
          <tbody>
            {env && env.map((item, i) => {
              const d = item.split('=');
              return (
                <tr key={i}>
                  <td style={{width: '25%'}}>
                    <Textfield name={`${i}[]`} defaultValue={d[0]} label="Host Volume" />
                  </td>
                  <td style={{width: '100%'}}>
                    <Textfield name={`${i}[]`} defaultValue={d[1]} label="Cotainer Volume" />
                  </td>
                  <td style={{width: '50px'}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentsForm);
