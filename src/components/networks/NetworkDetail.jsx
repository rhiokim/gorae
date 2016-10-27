import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import DocumentTitle from 'react-document-title';
import {
  Layout, Header, Tab, Content, Grid, Cell,
  Button, IconButton, Card, CardText, CardActions,
  Menu, MenuItem, Footer, FooterSection, FooterLinkList,
  } from 'react-mdl';
import {Tabs} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/network';

class NetworkDetail extends Component {
  constructor(...args) {
    super(...args);
    this.state = {activeTab: 0};
  }

  componentWillMount() {
    const {id} = this.props.params;
    this.props.fetchNetwork(id);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  renderNetworkRelation() {
    const {Containers} = this.props.network;
    return (
      <div className="network">
        {Object.keys(Containers).map((key, i) => {
          const container = Containers[key];
          return (
            <Grid key={i} component="section" className="section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <CardText>
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
                </CardText>
              </Cell>
              <IconButton name="more_vert" id={`btn${i}`} ripple />
              <Menu target={`btn${i}`} align="right" valign="bottom">
                <MenuItem>Lorem</MenuItem>
                <MenuItem disabled>Ipsum</MenuItem>
                <MenuItem>Dolor</MenuItem>
              </Menu>
            </Grid>
          );
        })}
      </div>
    )
  }

  renderBasicInformation() {
    const {network} = this.props;
    return (
      <Grid component="section" className="section--center" shadow={0} noSpacing>
        <Cell component={Card} col={12}>
          <CardText>
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
            Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum esse. Pariatur occaecat nisi laboris tempor laboris eiusmod qui id Lorem esse commodo in. Exercitation aute dolore deserunt culpa consequat elit labore incididunt elit anim.
          </CardText>
          <CardActions>
            <Button href="#">Read our features</Button>
          </CardActions>
        </Cell>
        <IconButton name="more_vert" id="btn3" ripple />
        <Menu target="btn3" align="right" valign="bottom">
          <MenuItem>Lorem</MenuItem>
          <MenuItem disabled>Ipsum</MenuItem>
          <MenuItem>Dolor</MenuItem>
        </Menu>
      </Grid>
    );
  }

  renderActiveTabContent() {
    switch (this.state.activeTab) {
        case 0: return this.renderBasicInformation();
        case 1: return this.renderNetworkRelation();
        default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    // const {activeTab} = this.state;
    return (

      <DocumentTitle title="Image Detail">
        <div className={classNames('image', 'mdl-demo', 'mdl-base')}>
          <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>

            <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Image Detail" scroll>
            </Header>
            {/*<Header className={getColorClass('primary')} title="Material Design Lite" scroll>
              <HeaderRow className="mdl-layout--large-screen-only" />
              <HeaderRow className="mdl-layout--large-screen-only">
                <h3>Name &amp; Title</h3>
              </HeaderRow>
              <HeaderRow className="mdl-layout--large-screen-only" />
              <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                <Tab>Dashboard</Tab>
                <Tab>Containers</Tab>
                <Tab>Containers Network</Tab>
                <Tab>Images</Tab>
                <Tab>Volumes</Tab>
                <FABButton ripple colored accent className="mdl-shadow--4dp" id="add">
                  <Icon name="add" />
                  <span className="visuallyhidden">Add</span>
                </FABButton>
              </HeaderTabs>
            </Header>*/}
            <Content component="main">
                  {/*this.renderActiveTabContent()*/}
              <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Basic Information</Tab>
                  <Tab>Containers</Tab>
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
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  network: state.networkReducer.network
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NetworkDetail);
