import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import {
  Layout, Content, Grid, Cell, DataTable, TableHeader,
  IconButton, Menu, MenuItem, Textfield
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/volumes';
import FooterBarSimple from './FooterBarSimple';

class Volumes extends Component {
  constructor(props) {
    super(props);

    this.searchByName = this.searchByName.bind(this);

    this.state = {
      activeTab: 0
    };
  }

  componentWillMount() {
    this.props.fetchVolumes();
  }

  searchByName(e, val) {
    const str = e.target.value;
    this.props.filterByName(str);
  }

  render() {
    const {volumes} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Volumes" />
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Grid component="section" className="section--center mt-40" noSpacing>
              <Cell col={12} phone={12} className={classNames('cell-title', getColorClass('light-green', 900), getTextColorClass('grey', 100))}>
                <IconButton name="more_vert" id="demo-menu-lower-left" />
                <Menu target="demo-menu-lower-left">
                  <MenuItem>Remove</MenuItem>
                </Menu>
                <Textfield onChange={this.searchByName} label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} tablet={12} phone={12}>
                {!volumes ? <div style={{textAlign: 'center', paddingTop: '30px', height: '50px'}}>No Volumes</div> :
                <DataTable selectable rowKeyColumn="Name" rows={volumes} shadow={0} className="image-table">
                  <TableHeader name="Driver">Driver</TableHeader>
                  <TableHeader name="Name">Name</TableHeader>
                  <TableHeader name="Mountpoint" className="td250">Mount Point</TableHeader>
                  <TableHeader name="Labels" cellFormatter={labels => Object.keys({}).join(',')} tooltip="">Lables</TableHeader>
                </DataTable>
                }
              </Cell>
            </Grid>
            <FooterBarSimple />
          </Content>
        </Layout>
      </div>
    );
  }
}

const filter = volumes => {
  return volumes.map(volume => {
    const {Driver, Name, Mountpoint, Labels} = volume;
    return {
      Driver: Driver,
      Name: Name.substr(0, 15),
      Mountpoint: Mountpoint,
      Labels: Labels
    }
  })
}

const mapStateToProps = state => ({
  _volumes: state.volumesReducer.volumes,
  volumes: filter(state.volumesReducer.filtered || state.volumesReducer.volumes)
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Volumes);
