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
import * as RemoveAction from '../actions/volume.remove';
import CreateVolume from './volumes/Create';
import FooterBarSimple from './FooterBarSimple';
import swal from './ui/dialog/Dialog';

class Volumes extends Component {
  constructor(props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);
    this.handleSuccessPull = this.handleSuccessPull.bind(this);
    this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    this.searchByName = this.searchByName.bind(this);

    this.state = {
      activeTab: 0,
      openCreateVolumeDialog: false
    };
  }

  componentWillMount() {
    this.props.fetchVolumes();
  }

  handleAction(e) {
    const {action} = e.target.dataset;

    e.preventDefault();

    switch (action) {
      case 'create':
        this.setState({openCreateVolumeDialog: true});
        break;
      case 'remove':
        swal.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover volumes!'
        }, isConfirm => {
          if (isConfirm) {
            this._selectedIDs.forEach(name => {
              this.props.removeVolume(name)
                .then(() => this.props.fetchVolumes());
            });
          }
        });
        break
      default:
        break;
    }
  }

  handleSuccessPull(res) {
    this.setState({openCreateVolumeDialog: false});
    this.props.fetchVolumes();
  }

  handleSelectionChanged(val) {
    this._selectedIDs = val;
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
                <IconButton name="more_vert" id="act" />
                <Menu target="act" align="left" valign="bottom" onClick={this.handleAction}>
                  <MenuItem data-action="create">Create Volume</MenuItem>
                  <MenuItem data-action="remove">Remove</MenuItem>
                </Menu>
                <Textfield onChange={this.searchByName} label="Search" className="pull-right" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} tablet={12} phone={12}>
                {!volumes ? <div style={{textAlign: 'center', paddingTop: '30px', height: '50px'}}>No Volumes</div> :
                <DataTable selectable rowKeyColumn="Name" rows={volumes} shadow={0} className="image-table" onSelectionChanged={this.handleSelectionChanged}>
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
        {this.state.openCreateVolumeDialog
          ? <CreateVolume
          onCancel={() => this.setState({openCreateVolumeDialog: false})}
          onSuccessPull={this.handleSuccessPull}
          style={{width: '600px'}} />
          : ''
        }
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
const mapDispatchToProps = dispatch => bindActionCreators({...RemoveAction, ...Actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Volumes);
