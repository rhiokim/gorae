import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Helmet from 'react-helmet';
// import {whyDidYouUpdate} from 'why-did-you-update';
import { Layout, Header, Content, Grid, Cell,
  Footer, FooterSection, FooterLinkList,
  } from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';
// import * as Actions from 'actions/nodes';
import * as Actions from '../actions/swarm';

import NodeItem from './nodes/NodeItem';

// if (process.env.NODE_ENV !== 'production') {
// //   whyDidYouUpdate(React);
// }

class Nodes extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeHeaderTab: 0
    };
  }

  componentWillMount() {
    setInterval(() => {
      // this.props.fetchNodes();
      this.props.fetchSwarm();
    }, 1000);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  render() {
    const {nodes} = this.props;
    return (
      <div className={classNames('networks', 'mdl-demo', 'mdl-base')}>
        <Helmet title="Nodes" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Nodes" scroll />
          <Content component="main">
            <Grid component="section" className="section--center" noSpacing>
              <Cell col={12} tablet={12} phone={12}>
              {nodes.map((node, i) => {
                return (<NodeItem key={i} {...node} />);
              })}
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
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  nodes: state.nodesReducer.nodes,
  tasks: state.tasksReducer.tasks
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nodes);
