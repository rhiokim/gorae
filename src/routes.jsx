import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App';
// import Home from './containers/Home';
import Dashboard from './components/Dashboard';
// import Images from './containers/images/Images';
import Home from './containers/Home';
import Images from './components/Images';
import Nodes from './components/Nodes';
import Contianers from './components/Containers';
// import ContainerList from './components/containers/ContainerList';
import ContainerDetail from './components/containers/ContainerDetail';
import ImageDetail from './components/images/ImageDetail';
import Networks from './components/Networks';
import NetworkDetail from './components/networks/NetworkDetail';
import Daemon from './components/daemon/Daemon';
import Events from './components/Events';
import Volumes from './components/Volumes';
import About from './containers/About';

export default (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="dashboard" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="nodes" component={Nodes} />
      <Route path="images" component={Images} />
      <Route path="images/:id" component={ImageDetail} />
      <Route path="containers" component={Contianers} />
      <Route path="containers/:id" component={ContainerDetail} />
      <Route path="networks" component={Networks} />
      <Route path="network/:id" component={NetworkDetail} />
      <Route path="daemon" component={Daemon} />
      <Route path="events" component={Events} />
      <Route path="volumes" component={Volumes} />
    </Route>
    <Route path="/about" component={About} />
  </Route>
);
