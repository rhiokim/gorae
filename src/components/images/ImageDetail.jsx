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
            <CardText>
              <h5>{id} <TimeAgo component="small" date={history.Created*1000}/></h5>
              <pre>{history.CreatedBy}</pre>
            </CardText>
          );
        })}
      </div>
    )
  }

  renderBasicInformation() {
    const {image} = this.props;
    return (
      <div>
        <h4>Basic Information</h4>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id:</td><td>{image.Id}</td>
            </tr>
            <tr>
              <td>Created:</td><td>{image.Created}</td>
            </tr>
            <tr>
              <td>Parent:</td><td>{image.Parent}</td>
            </tr>
            <tr>
              <td>Size:</td><td>{image.Size}</td>
            </tr>
            <tr>
              <td>Built with:</td><td>{image.DockerVersion}/{image.Os}/{image.Architecture}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderActiveTabContent() {
    switch (this.state.activeTab) {
        case 0: return this.renderBasicInformation();
        case 1: return this.renderImageHistory();
        default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    // const {image} = this.props;
    // const {activeTab} = this.state;
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
                  {this.renderActiveTabContent()}
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

const mapStateToProps = state => ({
  image: state.imageReducer.image,
  histories: state.imageHistoryReducer.histories
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
