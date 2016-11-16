import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import {
  Layout, Grid, Header, Content, Tabs, Tab, CardText, Card, Cell} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import {Version} from './Version';
import DaemonDetail from './DaemonDetail';
import * as Actions from '../../actions/daemon';
import FooterBarSimple from '../FooterBarSimple';

class Daemon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchVersion();
  }

  renderActiveTabContent() {
    const {activeTab} = this.state;
    const {daemon, version} = this.props

    switch (activeTab) {
      case 0: {
        return version ? <Version {...version} /> : '';
      }
      case 1: {
        return daemon ? <DaemonDetail {...daemon} /> : '';
      }
      case 2: {
        return <div>remote api</div>;
      }
      default:
        break;
    }
  }

  componentDidMount() {
    // dirty fix - https://github.com/react-mdl/react-mdl/issues/415#issuecomment-252508915
    window.componentHandler.upgradeAllRegistered();
  }

  render() {
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Helmet title="Daemon" />
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Daemon Detail" scroll />

            <Grid component="section" className="section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Version</Tab>
                  <Tab>Daemon Information</Tab>
                </Tabs>
                <CardText>
                  {this.renderActiveTabContent()}
                </CardText>
              </Cell>
            </Grid>
            <FooterBarSimple />
          </Content>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  daemon: state.daemonReducer.daemon,
  version: state.daemonReducer.version
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Daemon);
