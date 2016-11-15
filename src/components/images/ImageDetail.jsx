import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
import {
  Layout, Tab, Tabs, Content, Grid, Cell, Card, CardText, Header
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/image';
import {Basic} from './Basic';
import {History} from './History';
import FooterBarSimple from '../FooterBarSimple';

class ImageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: 0};
  }

  componentWillMount() {
    const {id} = this.props.params;
    this.props.fetchImage(id);
    this.props.fetchImageHistory(id);
  }

  componentDidMount() {
    // dirty fix - https://github.com/react-mdl/react-mdl/issues/415#issuecomment-252508915
    window.componentHandler.upgradeAllRegistered();
  }

  renderImageHistory() {
    const {histories} = this.props;
    return (
      <div className="history">
        {histories.map((history, i) => {
          const id = history.Id.replace('sha256:', '');
          return (
            <CardText key={i}>
              <h5>{id} <TimeAgo component="small" date={history.Created*1000}/></h5>
              <pre>{history.CreatedBy}</pre>
            </CardText>
          );
        })}
      </div>
    )
  }

  renderActiveTabContent() {
    const {image, histories} = this.props;
    switch (this.state.activeTab) {
        case 0: return <Basic {...image} />
        case 1: return <History histories={histories} />
        default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    const {image} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Helmet title="Image Details" />
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Image Details" scroll />

            <Grid component="section" className="section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Basic Information</Tab>
                  <Tab>History</Tab>
                </Tabs>
                <CardText>
                  {image && this.renderActiveTabContent()}
                </CardText>
              </Cell>
            </Grid>
            <FooterBarSimple />
          </Content>
        </Layout>
      </div>
    );
  }
}

const filter = histories => {
  return histories.map(h => ({
    Id: h.Id.indexOf('sha') > -1 ? h.Id.substr(7, 12) : h.Id,
    Created: h.Created * 1000,
    CreatedBy: h.CreatedBy,
    Size: h.Size
  }))
}

const mapStateToProps = state => ({
  image: state.imageReducer.image,
  histories: filter(state.imageHistoryReducer.histories || [])
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
