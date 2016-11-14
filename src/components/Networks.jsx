import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import {
  Layout, Content, Grid, Cell,
  IconButton, DataTable, TableHeader, Textfield, Menu, MenuItem
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/networks';
import FooterBarSimple from './FooterBarSimple';

class Networks extends React.Component {
  constructor(props) {
    super(props);

    this.searchByName = this.searchByName.bind(this);

    this.state = {
      activeHeaderTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchNetworks();
  }

  searchByName(e, val) {
    const str = e.target.value;
    this.props.filterByName(str);
  }

  render() {
    const {networks} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Networks" />
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Grid component="section" className="section--center mt-40" noSpacing>
              <Cell col={12} phone={12} className={classNames('cell-title', getColorClass('blue-grey', 600), getTextColorClass('grey', 100))}>
                <IconButton name="more_vert" id="demo-menu-lower-left" />
                <Menu target="demo-menu-lower-left">
                  <MenuItem>Remove</MenuItem>
                </Menu>
                <Textfield onChange={this.searchByName} label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
                <DataTable selectable rowKeyColumn="Id" rows={networks} shadow={0} className="image-table">
                  <TableHeader name="Name">Name</TableHeader>
                  <TableHeader name="Id" cellFormatter={id => (
                    <Link to={`/network/${id}`}>{id}</Link>
                  )}>Id</TableHeader>
                  <TableHeader name="Scope">Scope</TableHeader>
                  <TableHeader name="Driver">IPAM Driver</TableHeader>
                  <TableHeader name="IPAM" cellFormatter={ipam => ipam.Driver}>IPAM Driver</TableHeader>
                </DataTable>
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
  networks: state.networksReducer.filtered || state.networksReducer.networks
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Networks);
