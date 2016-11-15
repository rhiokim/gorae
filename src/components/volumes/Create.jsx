import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import serialize from 'form-serialize';

import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Spinner,
  CardTitle, Grid, Cell
} from 'react-mdl';

import * as Actions from '../../actions/volume.create';
import Typewriter from '../ui/typeWriter';

class CreateVolume extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      isDone: false,
      isCreating: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = serialize(this.form, { hash: true })

    this.setState({isCreating: true});
    this.props.createVolume(formData)
  }

  changeHandler(val) {
    this.setState({
      value: val.value
    });
  }

  componentWillReceiveProps(newProps) {
    const {create} = newProps;
    if (create) {
      this.setState({isDone: true});
      setTimeout(() => {
        this.setState({isCreating: false, isDone: false}, () => {
          this.props.onSuccessPull(create);
        });
      }, 4000);
    }
  }

  render() {
    const {onCancel, style} = this.props;
    const {isCreating, isDone} = this.state;

    return (
      <Dialog open={true} style={style} onCancel={onCancel}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(/assets/images/docker.jpg) center / cover'}}>
          <DialogTitle style={{textShadow: '0px 0px 2px #000'}}>Create Volume</DialogTitle>
        </CardTitle>
        <form ref={c => this.form = c} onSubmit={this.handleSubmit}>
          {isCreating
          ? <DialogContent style={{width: '100%', textAlign: 'center', padding: '10px'}}>
              {!isDone ? <Spinner singleColor /> : <Typewriter speed={200} tag="h4" text={["Done."]} />}
            </DialogContent>
          : <fieldset className="content-group">
            <Grid className="form-group">
              <Cell col={3}>
                <label style={{marginTop: '6px'}}>Name :</label>
              </Cell>
              <Cell col={9}>
                <input name="Name" className="form-control" type="text" placeholder="gorae" />
              </Cell>
              <Cell col={3}>
                <label style={{marginTop: '6px'}}>Driver :</label>
              </Cell>
              <Cell col={9}>
                <input name="Driver" className="form-control" type="text" placeholder="local" />
              </Cell>
            </Grid>
          </fieldset>
          }
          <DialogActions>
            <Button type='submit' disabled={isCreating}>Create</Button>
            <Button type='button' onClick={onCancel}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  volume: state.volumeReducer,
  create: state.volumeReducer.create
});

const mapDispathToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(CreateVolume);
