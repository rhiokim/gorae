import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';
import Helmet from 'react-helmet';
// import Push from 'push.js';

import {
  Layout, Header, Content, Grid, Cell, DataTable, TableHeader,
  Tabs, Tab, Card, CardText
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../actions/events';
import FooterBarSimple from './FooterBarSimple';

class Events extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeTab = this.handleChangeTab.bind(this);

    this.state = {
      activeTab: 0,
      params: {
        // since: 1466242481,
        since: 1466852113,
        until: 1466938513,
        // filters: [
        //   'event=start',
        //   'type=container'
        // ]
      }
    };
  }

  componentWillMount() {
    this.props.fetchEvents(this.state.params);
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChangeTab(tabId) {
    let type;
    this.setState({activeTab: tabId});

    switch (tabId) {
      case 0:
        type = 'CONTAINER';
        break;
      case 1:
        type = 'NETWORK';
        break;
      default:
        type = 'ALL';
        break;
    }
    this.props.filter(type);
  }

  renderActiveTabContent() {
  }

  componentDidMount() {
    // dirty fix - https://github.com/react-mdl/react-mdl/issues/415#issuecomment-252508915
    window.componentHandler.upgradeAllRegistered();
  }

  render() {
    const {events} = this.props;
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Layout className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            <Helmet title="Events" />
            <Header className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Docker events log" scroll />
            <Grid component="section" className="container-detail section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={this.handleChangeTab} ripple>
                  <Tab>Containers</Tab>
                  <Tab>Networks</Tab>
                </Tabs>
                <CardText>
                  <DataTable selectable rowKeyColumn="id" rows={events}>
                    <TableHeader name="Type" tooltip="tip">Type</TableHeader>
                    <TableHeader name="Action" tooltip="tip">Action</TableHeader>
                    <TableHeader name="status" tooltip="tip">Status</TableHeader>
                    <TableHeader name="time" cellFormatter={time => {
                      return (<TimeAgo date={time*1000} />);
                    }} tooltip="tip">Time</TableHeader>
                    <TableHeader name="from" cellFormatter={from => {
                      return (<Link to={`/images/${from}`}>{from}</Link>);
                    }} tooltip="tip">Image</TableHeader>
                    <TableHeader name="Actor" cellFormatter={actor => {
                      const {name} = actor.Attributes;
                      return (<Link to={`/containers/${name}`}>{name}</Link>);
                    }} tooltip="tip">Name</TableHeader>
                  </DataTable>
                </CardText>
                <section>
                  {this.renderActiveTabContent()}
                </section>
              </Cell>
            </Grid>
            <FooterBarSimple />
          </Content>
        </Layout>
      </div>
    );
  }
}

const getTypedEvents = (events, filter) => {
  switch (filter) {
    case 'CONTAINER':
      return events.filter(e => e.Type === 'container');
    case 'NETWORK':
      return events.filter(e => e.Type === 'network');
    default:
      return events;
  }
};

const mapStateToProps = state => {
  const {events, filter} = state.eventsReducer;
  return {
    events: getTypedEvents(events, filter)
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);
