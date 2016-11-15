import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Grid, Cell, IconButton, Button, CardActions, Checkbox} from 'react-mdl';
import serialize from 'form-serialize';

import * as Actions from '../../../actions/form';
import * as CommitAction from '../../../actions/commit';

class BindingsForm extends React.Component {
  constructor(props) {
    super();

    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      mounts: props.container.Mounts
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
    const formData = serialize(this.form, { hash: true });
    e.preventDefault();
    this.props.updateMounts(formData);
  }

  render() {
    const {mounts} = this.state;

    return (
      <form ref={c => this.form = c} onSubmit={this.handleSubmit} className="mt-30">
        <fieldset className="content-group">
          <legend className="text-bold">Volume Mounting</legend>
          {!mounts.length
            ? <div className="mb-20 text-center text-muted">No Mounted Volumes</div>
            : mounts.map((item, i) => {
              return <Grid key={i} className="form-group">
                <Cell col={4}>
                  <input name={`${i}[]`} type="text" className="form-control" defaultValue={item.Source} />
                </Cell>
                <Cell col={4}>
                  <input name={`${i}[]`} type="text" className="form-control" defaultValue={item.Destination} />
                </Cell>
                <Cell col={3} style={{paddingTop: '6px'}}>
                  <Checkbox name={`${i}[]`} label="Read Only" ripple defaultChecked={item.Mode === 'ro'} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BindingsForm);
