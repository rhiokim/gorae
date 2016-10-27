import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Push from 'push.js';
import * as Actions from '../../actions/events';

class EventMonitor extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      params: {
        filters: {
          container: 'boring'
        }
      }
    };
  }

  componentWillMount() {
    this.props.connEventStream(this.state.params);
  }

  componentWillReceiveProps(nextProps) {
    const {Type, Action, Actor} = nextProps.event;
    switch (Type) {
      case 'container':
        if (Action === 'start' || Action === 'stop') {
          const {image, name} = Actor.Attributes;
          Push.create('Container', {
            body: `${name} (from ${image}) container is ${Action}`,
            icon: {
              x16: 'assets/images/docker-logo.png',
              x32: 'assets/images/docker-logo.png'
            },
            timeout: 5500
          });
        }
        break;
      default:
        break;
    }
  }

  render() {
    return (<i></i>);
  }
}

const mapStateToProps = state => ({
  event: state.eventsReducer.event
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EventMonitor);
