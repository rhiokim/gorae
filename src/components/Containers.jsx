import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';

import {
  Content, Spinner, Grid, Cell, Tooltip, Layout, Checkbox,
  IconButton, Menu, MenuItem, DataTable, TableHeader, Textfield
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import {stringContainerPorts, stringLabel} from '../helpers/helpers';
import * as ContainerActions from '../actions/container';
import * as ContainersActions from '../actions/containers';
import {StateIcon} from './ui'
import FooterBarSimple from './FooterBarSimple';
import {Dialog} from '../components/ui';

class Containers extends Component {
  constructor(props) {
    super(props);

    this.handleMore = this.handleMore.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.searchByName = this.searchByName.bind(this);
    this.handleDisplayAll = this.handleDisplayAll.bind(this);
    this.handleSelectionChanged = this.handleSelectionChanged.bind(this);

    this.state = {
      params: {
        all: false,
        size: 1,
        filters: []
      }
    };
  }

  componentWillMount() {
    this.props.fetchContainers(this.state.params);
  }

  handleMore() {
    this.props.fetchContainers(this.state.params);
  }

  searchByName(e, val) {
    const str = e.target.value;
    this.props.filterByName(str);
  }

  handleAction(e) {
    const {action} = e.target.dataset;
    const containers = this.props._containers;
    switch (action) {
      case 'stop': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          this.props.stopContainer(container.Id);
        })
        break;
      }
      case 'start': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          console.log(container.Id)
          this.props.startContainer(container.Id, {
            id: container.Id
          });
        });
        break;
      }
      case 'kill': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          this.props.killContainer(container.Id);
        });
        break;
      }
      case 'restart': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          this.props.restartContainer(container.Id);
        });
        break;
      }
      case 'pause': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          this.props.pauseContainer(container.Id);
        });
        break;
      }
      case 'unpause': {
        this._selectedIndex.forEach(idx => {
          const container = containers[idx];
          this.props.unPauseContainer(container.Id);
        });
        break;
      }
      case 'remove': {
        Dialog.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this container!'
        }, isConfirm => {
          if (isConfirm) {
            this._selectedIndex.forEach(idx => {
              const container = containers[idx];
              this.props.removeContainer(container.Id)
            });
          }
        });
        break;
      }
      default:
        break;
    }
  }

  handleSelectionChanged(val) {
    this._selectedIndex = val;
  }

  handleDisplayAll(e) {
    this.setState({
      params: {
        ...this.state.params,
        all: e.target.checked
      }
    }, () => this.props.fetchContainers(this.state.params));
  }

  render() {
    const {containers} = this.props;

    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Containers" />
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Grid component="section" className="section--center mt-40" noSpacing>
              <Cell col={12} phone={12} className={classNames('cell-title', getColorClass('light-blue', 800), getTextColorClass('grey', 100))}>
                <IconButton name="more_vert" id="act" />
                <Menu target="act" align="left" valign="bottom" onClick={this.handleAction}>
                  <MenuItem data-action="start">Start</MenuItem>
                  <MenuItem data-action="stop">Stop</MenuItem>
                  <MenuItem data-action="kill">Kill</MenuItem>
                  <MenuItem data-action="pause">Pause</MenuItem>
                  <MenuItem data-action="unpause">Unpause</MenuItem>
                  <MenuItem data-action="restart">Restart</MenuItem>
                  <MenuItem data-action="remove">Remove</MenuItem>
                </Menu>
                <span>{containers.length} containers</span> |&nbsp;
                <Checkbox label="Display all" className="chk-display-all" checked={this.state.params.all} onChange={this.handleDisplayAll} />
                <Textfield onChange={this.searchByName} label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
              {!containers.length
                ? <div style={{width: '100%', textAlign: 'center', padding: '10px'}}>
                    <Spinner singleColor />
                  </div>
                : <DataTable selectable sortable rowKeyColumn="id" rows={containers} shadow={0} className="container-table" onSelectionChanged={this.handleSelectionChanged}>
                  <TableHeader name="State" className="td50" cellFormatter={(state, row) => (
                    <Tooltip label={row.Status} position="top">
                      <span><StateIcon state={state} /></span>
                    </Tooltip>
                  )}>Status</TableHeader>
                  <TableHeader name="Names" className="td150" cellFormatter={name => (
                    <Link to={`/containers/${name}`}>{name}</Link>
                  )}>Name</TableHeader>
                  <TableHeader name="Command">Command</TableHeader>
                  <TableHeader name="Image" cellFormatter={image => (
                    <Link to={`/images/${image}`} title={image}>{image}</Link>
                  )}>Image</TableHeader>
                  <TableHeader name="Ports" className="td50" cellFormatter={ports => (
                    <Tooltip label={ports} position="top">
                      <span>{ports}</span>
                    </Tooltip>
                  )}>Ports</TableHeader>
                  <TableHeader name="Created" cellFormatter={date => (
                    <TimeAgo date={date} />
                  )}>Created</TableHeader>
                  <TableHeader numeric name="Size">Size</TableHeader>
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

const filter = conatiners => {
  return conatiners.map(container => {
    const {Id, Image, Command, Created, Status, State, Names, Ports, Labels, SizeRootFs} = container;
    return {
    Id: Id,
    Image: Image,
    Command: Command,
    Created: Created*1000,
    Status: Status,
    State: State,
    Names: Names[0].substr(1),
    Size: prettyBytes(SizeRootFs),
    Ports: stringContainerPorts(Ports),
    Labels: stringLabel(Labels)
  }})
}

const mapStateToProps = state => ({
  _containers: state.containersReducer.containers,
  containers: filter(state.containersReducer.filtered || state.containersReducer.containers),
  last: state.containersReducer.last
});

const mapDispatchToProps = dispatch => bindActionCreators({...ContainerActions, ...ContainersActions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Containers);
