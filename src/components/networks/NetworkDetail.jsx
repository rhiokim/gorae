import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import {
  Layout, Header, Tab, Tabs, Content, Grid, Cell,
  Icon, Card, CardText
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/network';
import FooterBarSimple from '../FooterBarSimple';

class NetworkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: 0};
  }

  componentWillMount() {
    const {id} = this.props.params;
    this.props.fetchNetwork(id);
  }

  componentDidMount() {
    // dirty fix - https://github.com/react-mdl/react-mdl/issues/415#issuecomment-252508915
    window.componentHandler.upgradeAllRegistered();
  }

  renderNetworkRelation() {
    const {Containers} = this.props.network;
    return (
      <div className="network">
        {Object.keys(Containers).map((key, i) => {
          const container = Containers[key];
          return (
            <div key={key}>
              <h5>{key}</h5>
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Name:</td><td>{container.Name}</td>
                  </tr>
                  <tr>
                    <td>EndpointID:</td><td>{container.EndpointID}</td>
                  </tr>
                  <tr>
                    <td>IPv4Address:</td><td>{container.IPv4Address}</td>
                  </tr>
                  <tr>
                    <td>IPv6Address:</td><td>{container.IPv6Address}</td>
                  </tr>
                  <tr>
                    <td>MacAddress:</td><td>{container.MacAddress}</td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    )
  }

  renderBasicInformation() {
    const {network} = this.props;
    return (
      <div>
        <h4>Basic Information</h4>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id:</td><td>{network.Id}</td>
            </tr>
            <tr>
              <td>Created:</td><td>{network.Scope}</td>
            </tr>
            <tr>
              <td>Parent:</td><td>{network.Driver}</td>
            </tr>
            <tr>
              <td>Size:</td><td></td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderCreateNetwork() {
    return (
      <div>form</div>
    );
  }

  renderActiveTabContent() {
    switch (this.state.activeTab) {
        case 0: return this.renderBasicInformation();
        case 1: return this.renderNetworkRelation();
        case 2: return this.renderCreateNetwork();
        default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Helmet title="Network Details" />
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Network Details" scroll />

            <Grid component="section" className="section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Basic Information</Tab>
                  <Tab>Network Relation</Tab>
                  <Tab>Create Network</Tab>
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
  network: state.networkReducer.network
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NetworkDetail);
