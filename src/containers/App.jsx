import React, {Component} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import {
  Layout, Header, Content, Navigation,
  Icon, Grid, Cell, HeaderRow, Drawer, FABButton
} from 'react-mdl';
import EventMonitor from '../components/events/Monitor';

// import FooterWrapper from 'components/Footer';
export default class App extends Component {
  render() {
    const props = this.props;
    return (
      <Layout>
        <Helmet
          title={process.env.APP_NAME}
          titleTemplate=" %s | Gorae UI"
          meta={[
            {name: 'description', content: process.env.APP_DESCRIPTION},
            {name: 'version', content: process.env.APP_VERSION},
            {name: 'product', content: process.env.APP_NAME},
            {name: 'keywords', content: process.env.APP_KEYWORDS},
            {name: 'author', content: process.env.APP_AUTHOR},
            {name: 'license', content: process.env.APP_LICENSE}
          ]} />
        <Header>
          <HeaderRow title={<Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Gorae</Link>}>
            <Navigation>
              <a href="https://github.com/rhiokim/gorae">
                <Icon name="link" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  GitHub
              </a>
            </Navigation>
          </HeaderRow>
          <HeaderRow className="mdl-layout__header-second-menu">
            <Navigation>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/containers">Containers</Link>
              <Link to="/container-networks">Containers Network</Link>
              <Link to="/images">Images</Link>
              <Link to="/networks">Networks</Link>
              <Link to="/volumes">Volumes</Link>
              <Link to="/daemon">Daemon</Link>
              <Link to="/events">Events</Link>
            </Navigation>
          </HeaderRow>
          <FABButton ripple colored accent mini className="mdl-shadow--4dp" id="add">
            <Icon name="add" />
            <span className="visuallyhidden">Add</span>
          </FABButton>
        </Header>
        <Drawer title="Title">
          <Navigation>
            <a href="">Docker</a>
            <a href="">Registry</a>
            <a href="">Hub</a>
            <a href="">Link</a>
          </Navigation>
        </Drawer>
        <Content className="mdl-color-text--grey-600 mdl-color--grey-50">
          <Grid noSpacing>
            <Cell col={12}>
              {props.children}
            </Cell>
          </Grid>
        </Content>
        {
          (() => {
            if (process.env.NODE_ENV !== 'development') {
              const DevTools = require('../DevTools').default;
              return <DevTools />;
            }
          })()
        }
        <EventMonitor />
      </Layout>
    );
  }
}

