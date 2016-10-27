import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';

import {
  Layout, Grid, Header, Content, Tabs, Tab, Footer,
  FooterSection, FooterLinkList, CardText, Card, Cell} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import Version from './Version';
import DaemonDetail from './DaemonDetail';
import * as Actions from '../../actions/daemon';

class Daemon extends Component {
  constructor(...args) {
    super(...args);

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

    switch (activeTab) {
      case 0: {
        return (<Version info={this.props.version} />);
      }
      case 1: {
        return (<DaemonDetail info={this.props.daemon} />);
      }
      case 2: {
        return (<div>remote api</div>);
      }
      default:
        break;
    }
  }

  render() {
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Helmet title="Daemon" />
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Daemon Detail" scroll />

            <Grid component="section" className="container-detail section--center" shadow={0} noSpacing>
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
            <Footer size="mega">
              <FooterSection type="bottom" logo="More Information">
                <FooterLinkList>
                  <a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a>
                  <a href="#">Help</a>
                  <a href="#">Privacy & Terms</a>
                </FooterLinkList>
              </FooterSection>
            </Footer>
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
