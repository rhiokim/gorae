import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classnames';

import {Content, Header, Grid, Cell, Button, Icon,
  IconButton, Menu, MenuItem, Footer, FooterSection,
  FooterLinkList, DataTable, TableHeader, Textfield} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/containers';

class ContainerList extends Component {
  constructor(...args) {
    super(...args);

    this.handleMore = this.handleMore.bind(this);

    this.state = {
      params: {
        all: 0,
        limit: 20,
        size: 1,
        filters: {
        }
      }
    };
    this.props.fetchContainers(this.state.params);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      params: {
        ...this.state.params,
        before: nextProps.before
      }
    });
  }

  handleChange() {
  }

  handleMore() {
    this.props.fetchContainers(this.state.params);
  }

  render() {
    const {containers, before} = this.props;

    return (
      <Content component="main">
        <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Containers" scroll />
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
            <DataTable selectable rowKeyColumn="id" rows={containers}>
              <TableHeader name="Id" cellFormatter={id => id.substr(7, 12)} tooltip="The amazing material name">Id</TableHeader>
              <TableHeader name="Image" cellFormatter={image => (
                <Link to={`/images/${image}`}>{image}</Link>
              )} tooltip="Price pet unit">Image</TableHeader>
              <TableHeader name="Command" tooltip="Number of materials">Command</TableHeader>
              <TableHeader name="Created" tooltip="">Created</TableHeader>
              <TableHeader name="Status" className="td150" tooltip="">Status</TableHeader>
              <TableHeader name="Names" cellFormatter={name => {
                name = name[0].substr(1);
                return (
                  <Link to={`/containers/${name}`}>{name}</Link>
                );
              }} tooltip="The amazing material name">Name</TableHeader>
              <TableHeader name="Ports" cellFormatter={ports => {
                const p = ports[0];
                const port = p === undefined ? '' : `${p.IP}:${p.PublicPort}->${p.PrivatePort}/${p.Type}`;
                return port;
              }} className="td150" tooltip="The amazing material name">Ports</TableHeader>
              <TableHeader name="Labels" cellFormatter={labels => Object.keys({}).join(',')} tooltip="">Lables</TableHeader>
            </DataTable>
            {before !== undefined
              ? <Button className={classNames('bar', getColorClass('grey', 100), getTextColorClass('grey', 500))} ripple onClick={this.handleMore}><Icon name="add" /></Button>
              : <Button className={classNames('bar', getColorClass('grey', 100), getTextColorClass('grey', 300))} disabled>Completed</Button>
            }
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
    );
  }
}

const mapStateToProps = state => ({
  containers: state.containersReducer.containers,
  before: state.containersReducer.before
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContainerList);
