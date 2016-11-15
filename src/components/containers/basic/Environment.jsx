import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Grid, Cell, IconButton, Button, CardActions} from 'react-mdl';
import serialize from 'form-serialize';

import * as Actions from '../../../actions/form';
import * as CommitAction from '../../../actions/commit';

class EnvironmentsForm extends Component {
  constructor(props) {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      envs: props.container.Config.Env
    };
  }

  handleAdd(e) {
    e.preventDefault();
    this.setState({
      envs: [...this.state.envs, '=']
    });
  }

  handleClose(i) {
    const newState = Object.assign({}, this.state);
    newState.envs.splice(i, 1);
    this.setState(newState);
  }

  handleSubmit(e) {
    let form = serialize(this.form, { hash: true });
    let key;
    let data = [];

    for (key in form) {
      if ({}.hasOwnProperty.call(form, key)) {
        data.push(form[key].join('='));
      }
    }
    e.preventDefault();

    const {container} = this.props;
    const config = Object.assign({}, container.Config, {
      Env: data
    });

    this.props.commit({
      id: container.Id,
      tag: container.Config.Image,
      config: config
    })
    // this.props.updateEnv(data);
  }

  render() {
    const {envs} = this.state;

    return (
      <form ref={c => this.form = c} onSubmit={this.handleSubmit} className="mt-30">
        <fieldset className="content-group">
          <legend className="text-bold">Environment Variables</legend>
          {!envs.length
            ? <div className="mb-20 text-center text-muted">Nothing</div>
            : envs.map((env, i) => {
              const d = env.split('=');
              return <Grid key={i} className="form-group">
                <Cell col={3}>
                  <input name={`${i}[]`} type="text" className="form-control" defaultValue={d[0]} />
                </Cell>
                <Cell col={8}>
                  <input name={`${i}[]`} type="text" className="form-control" defaultValue={d[1]} />
                </Cell>
                <Cell col={1}>
                  <IconButton name="close" colored className="pull-right" onClick={this.handleClose.bind(this, i)} />
                </Cell>
              </Grid>
              })
          }
        </fieldset>

        <CardActions border style={{textAlign: 'right', padding: '15px 0'}}>
          <Button colored onClick={() => {}}>Reset</Button>
          <Button colored type="submit">Commit and Restart</Button>
          <Button raised colored onClick={this.handleAdd}>Add</Button>
        </CardActions>
      </form>
    );
  }
}

const mapStateToProps = state => ({
});
const mapDispatchToProps = dispatch => bindActionCreators({...CommitAction, ...Actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentsForm);
