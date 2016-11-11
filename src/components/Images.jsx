import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import classNames from 'classnames';
import prettyBytes from 'pretty-bytes';
import {
  Layout, Content, Grid, Cell, DataTable, TableHeader,
  IconButton, Menu, MenuItem, Textfield
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/images';
import FooterBarSimple from './FooterBarSimple';

class Images extends Component {
  constructor(props) {
    super(props);

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
                <Textfield onChange={this.searchByName} label="Search" expandable expandableIcon="search" />
              </Cell>
              <Cell col={12} phone={12}>
                <DataTable selectable rowKeyColumn="id" rows={images} shadow={0} className="image-table">
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
