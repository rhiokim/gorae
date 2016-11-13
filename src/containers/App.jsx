/* global pkginfo */
import React from 'react';
import Helmet from 'react-helmet';

import {
  Layout
} from 'react-mdl';

import EventMonitor from '../components/events/Monitor';
import HeaderBarSimple from '../components/HeaderBarSimple';
import Notifier from '../components/notifier/Snack';
import {SideBar} from '../components/SideBar';
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
        <HeaderBarSimple />
        <SideBar />
        {props.children}
        {
          // (() => {
          //   if (process.env.NODE_ENV === 'development') {
          //     const DevTools = require('../DevTools').default;
          //     return <DevTools />;
          //   }
          // })()
        }
        <Notifier />
        <EventMonitor />
      </Layout>
    );
  }
}

