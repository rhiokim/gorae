import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
// import {whyDidYouUpdate} from 'why-did-you-update';
import { Layout, Header, Content, Grid, Cell,
  IconButton, DataTable, TableHeader, Textfield,
  Menu, MenuItem, Footer, FooterSection, FooterLinkList,
  } from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/networks';

// if (process.env.NODE_ENV !== 'production') {
// //   whyDidYouUpdate(React);
// }

class Networks extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeHeaderTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchNetworks();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  render() {
    const {networks} = this.props;
    return (
      <div className={classNames('networks', 'mdl-demo', 'mdl-base')}>
        <Helmet title="Networks" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Networks" scroll />
          {/* <Header className={getColorClass('primary')} title="Material Design Lite" scroll>
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
          </Header> */}
          <Content component="main">
            {/* this.renderActiveTabContent() */}
            <Grid component="section" className="section--center" shadow={0} noSpacing>
              <Cell col={12} phone={12} className={classNames('cell-title', getColorClass('grey', 800), getTextColorClass('grey', 100))}>
                <IconButton name="more_vert" id="demo-menu-lower-left" />
                <Menu target="demo-menu-lower-left">
                  <MenuItem>Start</MenuItem>
                  <MenuItem>Stop</MenuItem>
                  <MenuItem>Restart</MenuItem>
                  <MenuItem>Kill</MenuItem>
                  <MenuItem>Pause</MenuItem>
                  <MenuItem>Unpause</MenuItem>
                  <MenuItem>Remove</MenuItem>
                </Menu>
                <Textfield value="" label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
                <DataTable selectable rowKeyColumn="Id" rows={networks}>
                  <TableHeader name="Name" tooltip="The amazing material name">Name</TableHeader>
                  <TableHeader name="Id" cellFormatter={id => (
                    <Link to={`/network/${id}`}>{id}</Link>
                  )} tooltip="Price pet unit">Id</TableHeader>
                  <TableHeader name="Scope" tooltip="Number of materials">Scope</TableHeader>
                  <TableHeader name="Driver" tooltip="Number of materials">IPAM Driver</TableHeader>
                  <TableHeader name="IPAM" cellFormatter={ipam => ipam.Driver} tooltip="Number of materials">IPAM Driver</TableHeader>
                </DataTable>
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
  networks: state.networksReducer.networks
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Networks);
