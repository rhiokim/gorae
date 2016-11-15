import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import serialize from 'form-serialize';

import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Spinner,
  CardTitle, Grid, Cell
} from 'react-mdl';

import * as Actions from '../../actions/image.create';
import Typewriter from '../ui/typeWriter';

class ImagePull extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);

    this.state = {
      isDone: false,
      isPulling: false
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = serialize(this.form, { hash: true })

    this.setState({isPulling: true});
    this.props.createImage(formData)
  }

  changeHandler(val) {
    this.setState({
      value: val.value
    });
  }

  componentWillReceiveProps(newProps) {
    const {pull} = newProps;
    if (pull) {
      this.setState({isDone: true});
      setTimeout(() => {
        this.setState({isPulling: false, isDone: false}, () => {
          this.props.onSuccessPull(pull);
        });
      }, 4000);
    }
  }

  render() {
    const {onCancel, style} = this.props;
    const {isPulling, isDone} = this.state;

    return (
      <Dialog open={true} style={style} onCancel={onCancel}>
        <CardTitle style={{color: '#fff', height: '176px', background: 'url(/assets/images/docker.jpg) center / cover'}}>
          <DialogTitle style={{textShadow: '0px 0px 2px #000'}}>Pull Image</DialogTitle>
        </CardTitle>
        <form ref={c => this.form = c} onSubmit={this.handleSubmit}>
          {isPulling
          ? <DialogContent style={{width: '100%', textAlign: 'center', padding: '10px'}}>
              {!isDone ? <Spinner singleColor /> : <Typewriter speed={200} tag="h4" text={["Done."]} />}
            </DialogContent>
          : <fieldset className="content-group">
            <Grid className="form-group">
              <Cell col={3}>
                <label style={{marginTop: '6px'}}>Registry :</label>
              </Cell>
              <Cell col={9}>
                <input name="registry" className="form-control" type="text" placeholder="Registry. Leave empty to user docker hub" />
              </Cell>
              <Cell col={3}>
                <label style={{marginTop: '6px'}}>Image Name :</label>
              </Cell>
              <Cell col={9}>
                <input name="fromImage" className="form-control" type="text" placeholder="Image name" />
              </Cell>
              <Cell col={3}>
                <label style={{marginTop: '6px'}}>Tag Name :</label>
              </Cell>
              <Cell col={9}>
                <input name="tag" className="form-control" type="text" defaultValue="latest" placeholder="latest" />
              </Cell>
            </Grid>
          </fieldset>
          }
          <DialogActions>
            <Button type='submit' disabled={isPulling}>Pull</Button>
            <Button type='button' onClick={onCancel}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => ({
  image: state.imageReducer,
  pull: state.imageReducer.pull
});

const mapDispathToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(ImagePull);
