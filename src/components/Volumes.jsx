import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Layout, Header, Content, Grid, Cell, DataTable, TableHeader,
  IconButton, Menu, MenuItem, Footer, FooterSection, FooterLinkList,
  Textfield } from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/volumes';

class Volumes extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchVolumes();
  }

  renderActiveTabContent() {}

  render() {
    const {volumes} = this.props;
    return (
      <div className={classNames('image', 'mdl-demo', 'mdl-base')}>
        <Helmet title="Volumes" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Volumes" scroll />
          <Content component="main">
            <Grid component="section" className="section--center" shadow={0} noSpacing>
              <Cell col={12} table={12} phone={12} className={classNames('cell-title', getColorClass('grey', 800), getTextColorClass('grey', 100))}>
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
              <Cell col={12} tablet={12} phone={12}>
                <DataTable selectable rowKeyColumn="Name" rows={volumes}>
                  <TableHeader name="Driver" tooltip="The amazing material name">Driver</TableHeader>
                  <TableHeader name="Name" cellFormatter={id => id.substr(0, 15)} tooltip="Number of materials">Name</TableHeader>
                  <TableHeader name="Mountpoint" className="td250" tooltip="Price pet unit">Mount Point</TableHeader>
                  <TableHeader name="Labels" cellFormatter={labels => Object.keys({}).join(',')} tooltip="">Lables</TableHeader>
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
  volumes: state.volumesReducer.volumes
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Volumes);
