import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import {
  Layout, Content, Grid, Cell, DataTable, TableHeader,
  IconButton, Menu, MenuItem, Textfield, Spinner
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/images';
import FooterBarSimple from './FooterBarSimple';
import {Dialog} from '../components/ui';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);
    this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    this.searchByName = this.searchByName.bind(this);

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

  handleSelectionChanged(val) {
  }

  handleAction(e) {
    const {action} = e.target.dataset;
    const {container, forms} = this.props;
    switch (action) {
      case 'commit': {
        const newState = Object.assign({}, {
          ...container.Config,
          Env: forms.env
        });
        this.props.fetchCommits(newState, {
          container: container.Id,
          tag: container.Config.Image
        });
        break;
      }
      case 'stop': {
        this.props.stopContainer(container.Id);
        break;
      }
      case 'start': {
        this.props.startContainer(container.Id, {
          HostConfig: container.HostConfig,
          id: container.Id
        });
        break;
      }
      case 'kill': {
        this.props.killContainer(container.Id);
        break;
      }
      case 'restart': {
        this.props.restartContainer(container.Id);
        break;
      }
      case 'pause': {
        this.props.pauseContainer(container.Id);
        break;
      }
      case 'unpause': {
        this.props.unPauseContainer(container.Id);
        break;
      }
      case 'remove': {
        Dialog.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this container!'
        }, isConfirm => {
          if (isConfirm) {
            this.props.removeContainer(container.Id)
          }
        });
        break;
      }
      default:
        break;
    }
  }

  searchByName(e, val) {
    const str = e.target.value;
    this.props.filterByName(str);
  }

  render() {
    const {images} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Images" />
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Grid component="section" className="section--center mt-40" noSpacing>
              <Cell col={12} phone={12} className={classNames('cell-title', getColorClass('teal', 800), getTextColorClass('grey', 100))}>
                <IconButton name="more_vert" id="act" />
                <Menu target="act" align="left" valign="bottom" onClick={this.handleAction}>
                  <MenuItem data-action="start">Start</MenuItem>
                  <MenuItem data-action="stop">Stop</MenuItem>
                  <MenuItem data-action="kill">Kill</MenuItem>
                  <MenuItem data-action="pause">Pause</MenuItem>
                  <MenuItem data-action="unpause">Unpause</MenuItem>
                  <MenuItem data-action="restart">Restart</MenuItem>
                  <MenuItem data-action="commit">Commit</MenuItem>
                  <MenuItem data-action="remove">Remove</MenuItem>
                </Menu>
                <Textfield onChange={this.searchByName} label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
                {!images.length
                ? <div style={{width: '100%', textAlign: 'center', padding: '10px'}}>
                    <Spinner singleColor />
                  </div>
                : <DataTable selectable sortable rowKeyColumn="id" rows={images} shadow={0} className="image-table">
                  <TableHeader name="RepoTags" className="td50" cellFormatter={(repo, row) => (
                    <Link to={`/images/${row.Id}`}>{repo}</Link>
                  )}>Repository</TableHeader>
                  <TableHeader name="ParentId" cellFormatter={id => (
                    <Link to={`/images/${id}`}>{id.substr(7, 12)}</Link>
                  )}>Parent</TableHeader>
                  <TableHeader numeric name="VirtualSize">Virtual Size</TableHeader>
                  <TableHeader name="Created" cellFormatter={date => (
                      <TimeAgo date={date} />
                  )}>Created</TableHeader>
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

const filter = images => {
  return images.map(image => {
    const {Id, Created, ParentId, RepoTags, VirtualSize} = image;
    return {
      Id: Id,
      Created: Created*1000,
      ParentId: ParentId,
      RepoTags: RepoTags[0],
      VirtualSize: prettyBytes(VirtualSize)
    }
  })
};

const mapStateToProps = state => ({
  _images: state.imagesReducer.images,
  images: filter(state.imagesReducer.filtered ||state.imagesReducer.images)
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Images);
