import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import serialize from 'form-serialize';

import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Spinner,
  CardTitle, Grid, Cell
} from 'react-mdl';

import * as Actions from '../../actions/network.create';
import Typewriter from '../ui/typeWriter';

class CreateNetwork extends React.Component {
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

    const IPAM = {
      Config: [{
        Subnet: formData.Subnet,
        IPRange: formData.IPRange,
        Gateway: formData.Gateway
      }]
    }
    this.setState({isCreating: true});
    this.props.createNetwork({
      Driver: formData.Driver,
      Name: formData.Name,
      IPAM: IPAM
    })
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
          <DialogTitle style={{textShadow: '0px 0px 2px #000'}}>Create Network</DialogTitle>
        </CardTitle>
        <form ref={c => this.form = c} onSubmit={this.handleSubmit}>
          {isCreating
          ? <DialogContent style={{width: '100%', textAlign: 'center', padding: '10px'}}>
              {!isDone ? <Spinner singleColor /> : <Typewriter speed={200} tag="h4" text={["Done."]} />}
            </DialogContent>
          : <fieldset className="content-group">
            <Grid className="form-group">
              <Cell col={2}>
                <label style={{marginTop: '6px'}}>Name:</label>
              </Cell>
              <Cell col={4}>
                <input name="Name" className="form-control" type="text" placeholder="Isolated Network" />
              </Cell>
              <Cell col={2}>
                <label style={{marginTop: '6px'}}>Driver:</label>
              </Cell>
              <Cell col={4}>
                <input name="Driver" className="form-control" type="text" placeholder="Driver Name" />
              </Cell>
              <Cell col={2}>
                <label style={{marginTop: '6px'}}>Subnet:</label>
              </Cell>
              <Cell col={4}>
                <input name="Subnet" className="form-control" type="text" placeholder="10.12.0.0/16" />
              </Cell>
              <Cell col={2}>
                <label style={{marginTop: '6px'}}>Gateway:</label>
              </Cell>
              <Cell col={4}>
                <input name="Gateway" className="form-control" type="text" placeholder="10.12.0.1" />
              </Cell>
              <Cell col={2}>
                <label style={{marginTop: '6px'}}>IPRange:</label>
              </Cell>
              <Cell col={4}>
                <input name="IPRange" className="form-control" type="text" placeholder="10.12.0.0/24" />
              </Cell>
              <Cell col={6}>
              </Cell>
              <Cell col={4}>
                <label className="checkbox-inline checkbox-right" style={{marginTop: '6px'}}>Check Duplicate:
                  <input name="CheckDuplicate" type="checkbox" placeholder="" />
                </label>
              </Cell>
              <Cell col={4}>
                <label className="checkbox-inline checkbox-right" style={{marginTop: '6px'}}>Enable IPv6:
                  <input name="EnableIPv6" type="checkbox" placeholder="" />
                </label>
              </Cell>
              <Cell col={4}>
              </Cell>
            </Grid>
          </fieldset>
          }
          <DialogActions>
            <Button type='submit'>Create Network</Button>
            <Button type='button' onClick={onCancel}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  network: state.networkReducer,
  create: state.networkReducer.create
});

const mapDispathToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(CreateNetwork);
