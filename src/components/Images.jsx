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
  IconButton, Menu, MenuItem, Textfield, Spinner, Checkbox
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as ImageActions from '../actions/images';
import * as ImageRemoveAction from '../actions/image.remove';
import ImagePull from './images/Pull';
import FooterBarSimple from './FooterBarSimple';
import swal from './ui/dialog/Dialog';

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.handleAction = this.handleAction.bind(this);
    this.handleDisplayAll = this.handleDisplayAll.bind(this);
    this.handleSuccessPull = this.handleSuccessPull.bind(this);
    this.handleSelectionChanged = this.handleSelectionChanged.bind(this);
    this.searchByName = this.searchByName.bind(this);

    this.state = {
      openImagePullDialog: false,
      params: {
        all: false,
        filters: [
        ]
      }
    };
  }

  componentWillMount() {
    this.props.fetchImages(this.state.params);
  }

  handleAction(e) {
    const {action} = e.target.dataset;

    e.preventDefault();

    switch (action) {
      case 'pull': {
        this.setState({openImagePullDialog: true});
        break;
      }
      case 'remove': {
        swal.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this image!'
        }, isConfirm => {
          if (isConfirm) {
            this._selectedIDs.forEach(id => {
              this.props.removeImage(id)
                .then(() => this.props.fetchImages(this.state.params));
            });
          }
        });
        break;
      }
      case 'removef': {
        swal.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this image!'
        }, isConfirm => {
          if (isConfirm) {
            this._selectedIDs.forEach(id => {
              this.props.removeImage(id, {force: true})
                .then(() => this.props.fetchImages(this.state.params));
            });
          }
        });
        break;
      }
      case 'removep': {
        swal.warnConfirm({
          title: 'Are you sure?',
          text: 'You will not be able to recover this image!'
        }, isConfirm => {
          if (isConfirm) {
            this._selectedIDs.forEach(id => {
              this.props.removeImage(id, {noprune: true})
                .then(() => this.props.fetchImages(this.state.params));
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
    this._selectedIDs = val;
  }

  handleDisplayAll(e) {
    this.setState({
      params: {
        ...this.state.params,
        all: e.target.checked
      }
    }, () => this.props.fetchImages(this.state.params));
  }

  handleSuccessPull(res) {
    this.setState({openImagePullDialog: false});
    this.props.fetchImages(this.state.params);
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
                  <MenuItem data-action="pull">Pull <small data-action="pull">from Docker Hub</small></MenuItem>
                  <MenuItem data-action="remove">Remove</MenuItem>
                  <MenuItem data-action="removef">Remove <small data-action="removef">(--force)</small></MenuItem>
                  <MenuItem data-action="removep">Remove <small data-action="removep">(--no-prune)</small></MenuItem>
                  <MenuItem data-action="dangling" disabled>Remove Unsafe Image <small data-action="dangling">(dangling=true)</small></MenuItem>
                </Menu>
                <span>total: {images.length} images</span> |&nbsp;
                <Checkbox label="Display all" className="chk-display-all" checked={this.state.params.all} onChange={this.handleDisplayAll} />
                <Textfield onChange={this.searchByName} className="pull-right" label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
                {!images.length
                ? <div style={{width: '100%', textAlign: 'center', padding: '10px'}}>
                    <Spinner singleColor />
                  </div>
                : <DataTable selectable sortable rowKeyColumn="Id" rows={images} shadow={0} className="image-table" onSelectionChanged={this.handleSelectionChanged}>
                  <TableHeader name="RepoTags" className="td50" cellFormatter={(repo, row) => (
                    <Link to={`/images/${row.Id}`}>{repo}</Link>
                  )}>Repository</TableHeader>
                  <TableHeader name="Id" cellFormatter={id => (
                    <Link to={`/images/${id}`}>{id.substr(7, 12)}</Link>
                  )}>Image Id</TableHeader>
                  <TableHeader name="ParentId" cellFormatter={id => (
                    <Link to={`/images/${id}`}>{id.substr(7, 12)}</Link>
                  )}>Parent Id</TableHeader>
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
        {this.state.openImagePullDialog
          ? <ImagePull
          onCancel={() => this.setState({openImagePullDialog: false})}
          onSuccessPull={this.handleSuccessPull}
          style={{width: '600px'}} />
          : ''
        }
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
      RepoTags: RepoTags ? RepoTags[0] : [],
      VirtualSize: prettyBytes(VirtualSize)
    }
  })
};

const mapStateToProps = state => ({
  _images: state.imagesReducer.images,
  images: filter(state.imagesReducer.filtered || state.imagesReducer.images)
});

const mapDispatchToProps = dispatch => bindActionCreators({...ImageActions, ...ImageRemoveAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Images);
