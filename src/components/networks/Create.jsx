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
          : <DialogContent>
          <Grid noSpacing>
            <Cell col={6}>
              <table className="basic-grey" style={{width: '100%', position: 'relative'}}>
                <tbody>
                  <tr>
                    <td style={{width: '70px', fontSize: '12px'}}>
                      <span>Name : </span>
                    </td>
                    <td>
                      <input name="Name" type="text" placeholder="Isolated Network" style={{width: '160px'}} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{width: '70px', fontSize: '12px'}}>
                      <span>Subnet : </span>
                    </td>
                    <td>
                      <input name="Subnet" type="text" placeholder="10.12.0.0/16" defaultValue="" style={{width: '160px'}} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{width: '70px', fontSize: '12px'}}>
                      <span>IPRange : </span>
                    </td>
                    <td>
                      <input name="IPRange" type="text" placeholder="10.12.0.0/24" defaultValue="" style={{width: '160px'}} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Cell>
            <Cell col={6}>
              <table className="basic-grey" style={{width: '100%', position: 'relative'}}>
                <tbody>
                  <tr>
                    <td style={{width: '70px', fontSize: '12px'}}>
                      <span>Driver : </span>
                    </td>
                    <td>
                      <input name="Driver" type="text" placeholder="Image name" style={{width: '160px'}} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{width: '70px', fontSize: '12px'}}>
                      <span>Gateway : </span>
                    </td>
                    <td>
                      <input name="Gateway" type="text" placeholder="10.12.0.1" defaultValue="" style={{width: '160px'}} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Cell>
            <Cell col={12}>
              <table className="basic-grey" style={{width: '100%', position: 'relative'}}>
                <tbody>
                  <tr>
                    <td style={{width: '100px', fontSize: '12px'}}>
                      <span>Check Duplicate : </span>
                    </td>
                    <td>
                      <input name="tag" type="checkbox" style={{width: '100px'}} />
                    </td>
                    <td style={{width: '100px', fontSize: '12px'}}>
                      <span>Enable IPv6 : </span>
                    </td>
                    <td>
                      <input name="tag" type="checkbox" style={{width: '100px'}} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Cell>
            </Grid>
          </DialogContent>
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
