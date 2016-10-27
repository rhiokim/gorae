import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Layout, Header, Content, Grid, Cell, DataTable, TableHeader,
  IconButton, Menu, MenuItem, Footer, FooterSection, FooterLinkList,
  Textfield } from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/images';

class Images extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      all: 0,
      filters: {
        dangling: true
      }
    };
  }

  componentWillMount() {
    this.props.fetchImages();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  render() {
    const {images} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base', 'images')}>
        <Helmet title="Images" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Images" scroll />
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
                <DataTable selectable rowKeyColumn="id" rows={images}>
                  <TableHeader name="RepoTags" cellFormatter={tags => tags[0]} tooltip="The amazing material name">Repository</TableHeader>
                  <TableHeader name="Id" cellFormatter={id => (
                    <Link to={`/images/${id}`}>{id.substr(7, 12)}</Link>
                  )} tooltip="Price pet unit">Id</TableHeader>
                  <TableHeader name="ParentId" cellFormatter={id => (
                    <Link to={`/images/${id}`}>{id.substr(7, 12)}</Link>
                  )} tooltip="Number of materials">Parent</TableHeader>
                  <TableHeader numeric name="VirtualSize" tooltip="Number of materials">Virtual Size</TableHeader>
                  <TableHeader name="Created" tooltip="">Created</TableHeader>
                  <TableHeader name="Labels" cellFormatter={(labels) => Object.keys({}).join(',')} tooltip="">Lables</TableHeader>
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
  images: state.imagesReducer.images
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Images);
