import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import * as Actions from 'actions/daemon';
import {
  Layout, Header, Content, Tabs, Tab, Footer,
  FooterSection, FooterLinkList} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

class DaemonDetail extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchInfo();
  }

  renderActiveTabContent() {}

  render() {
    // const {images} = this.props;
    return (
      <div className={classNames('image', 'mdl-demo', 'mdl-base')}>
        <Helmet title="sample" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Image Detail" scroll />
          <Content component="main">
            <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={tabId => this.setState({ activeTab: tabId })} ripple>
              <Tab>Version</Tab>
              <Tab>Daemon Information</Tab>
              <Tab>Remote API</Tab>
            </Tabs>
            <section>
              {this.renderActiveTabContent()}
            </section>
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
  daemon: state.daemonReducer.daemon
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DaemonDetail);
