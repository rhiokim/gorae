import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {
  Layout, Tabs, Header, Tab, Content, Grid, Cell,
  IconButton, Card, CardText, Menu, MenuItem
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import {Dialog} from '../../components/ui';
import * as Actions from '../../actions/container';
import Basic from './Basic';
import Logs from './Logs';
import Processes from './Processes';
import Stats from './Stats';
import Changes from './Changes';
import Terminal from './Terminal';
import FooterBarSimple from '../../components/FooterBarSimple';

class ContainerDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);

    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
    // const {id} = this.props.params;
    // this.props.fetchContainer(id);
  }

  handleAction(e) {
    const {action} = e.target.dataset;
    const {container, forms} = this.props;
    switch (action) {
      case 'commit': {
        const newState = Object.assign({}, {
          ...container.Config,
          Env: forms.env
        });
        this.props.fetchCommits(newState, {
          container: container.Id,
          tag: container.Config.Image
        });
        break;
      }
      case 'stop': {
        this.props.stopContainer(container.Id);
        break;
      }
      case 'start': {
        this.props.startContainer(container.Id, {
          HostConfig: container.HostConfig,
          id: container.Id
        });
        break;
      }
      case 'kill': {
        this.props.killContainer(container.Id);
        break;
      }
      case 'restart': {
        this.props.restartContainer(container.Id);
        break;
      }
      case 'pause': {
        this.props.pauseContainer(container.Id);
        break;
      }
      case 'unpause': {
        this.props.unPauseContainer(container.Id);
        break;
      }
      case 'remove': {
        Dialog.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this container!'
        }, isConfirm => {
          if (isConfirm) {
            this.props.removeContainer(container.Id)
          }
        });
        break;
      }
      default:
        break;
    }
  }

  renderActiveTabContent() {
    const {id} = this.props.params;
    const {container} = this.props;

    switch (this.state.activeTab) {
      case 0: {
        return (<Basic id={id} />);
      }
      case 1: {
        return (<Logs id={id} />);
      }
      case 2: {
        return (<Processes id={id} />);
      }
      case 3: {
        return (<Stats id={id} />);
      }
      case 4: {
        return (<Changes id={id} />);
      }
      case 5: {
        return (<Terminal id={id} container={container} />);
      }
      default: return <div>Nothing to see here :-)</div>;
    }
  }

  componentDidMount() {
    // dirty fix - https://github.com/react-mdl/react-mdl/issues/415#issuecomment-252508915
    window.componentHandler.upgradeAllRegistered();
  }

  render() {
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Container Detail" scroll />

            <Grid component="section" className="container-detail section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Basic Information</Tab>
                  <Tab>Logs</Tab>
                  <Tab>Process</Tab>
                  <Tab>Stats</Tab>
                  <Tab>Changes</Tab>
                  <Tab>Terminal</Tab>
                </Tabs>
                <CardText>
                  {this.renderActiveTabContent()}
                </CardText>
              </Cell>
              <IconButton name="more_vert" id="act" ripple />
              <Menu target="act" align="right" valign="bottom" onClick={this.handleAction}>
                <MenuItem data-action="start">Start</MenuItem>
                <MenuItem data-action="stop">Stop</MenuItem>
                <MenuItem data-action="kill">Kill</MenuItem>
                <MenuItem data-action="pause">Pause</MenuItem>
                <MenuItem data-action="unpause">Unpause</MenuItem>
                <MenuItem data-action="restart">Restart</MenuItem>
                <MenuItem data-action="commit">Commit</MenuItem>
                <MenuItem data-action="remove">Remove</MenuItem>
              </Menu>
            </Grid>
            <FooterBarSimple />
          </Content>
        </Layout>
      </div>
    );
  }
}

ContainerDetail.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  container: state.containerReducer.container,
  forms: state.formReducer.forms,
  top: state.containerReducer.top
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDetail);
