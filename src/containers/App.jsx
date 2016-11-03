/* global pkginfo */
import React from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';

import {
  Layout, Header, Content, Navigation,
  Icon, Grid, Cell, HeaderRow, Drawer, FABButton
} from 'react-mdl';
import EventMonitor from '../components/events/Monitor';

// import FooterWrapper from 'components/Footer';
export default class App extends React.Component {
  render() {
    const props = this.props;
    return (
      <Layout>
        <Helmet
          title={pkginfo.name}
          titleTemplate=" %s | Gorae UI"
          meta={[
            {name: 'description', content: pkginfo.description},
            {name: 'version', content: pkginfo.version},
            {name: 'product', content: pkginfo.name},
            {name: 'keywords', content: pkginfo.keywords},
            {name: 'author', content: pkginfo.author},
            {name: 'license', content: pkginfo.license},
            {name: 'sha', content: pkginfo.sha}
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

