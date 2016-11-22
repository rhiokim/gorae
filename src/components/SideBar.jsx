import React from 'react';
import {Link} from 'react-router';
import {Drawer, Navigation, Icon} from 'react-mdl';

import './SideBar.css';

export const SideBar = props => (
  <Drawer title="Gorae">
    <Navigation>
      <Link to="/">
        <Icon name="dashboard" /> Dashboard
      </Link>
    </Navigation>
    <Navigation>
      <span>RESOURCE</span>
      <Link to="/images">
        <Icon name="apps" /> Images
      </Link>
      <Link to="/containers">
        <Icon name="event_note" /> Containers
      </Link>
      <Link to="/networks">
        <Icon name="event_note" /> Networks
      </Link>
      <Link to="/volumes">
        <Icon name="event_note" /> Volumes
      </Link>
    </Navigation>
    <Navigation>
      <span>SETTINGS</span>
      <Link to="/events">
        <Icon name="settings" /> Events Log
      </Link>
      <Link to="/daemon">
        <Icon name="settings" /> Deamon
      </Link>
      <Link to="/swarm">
        <Icon name="settings" /> Settings
      </Link>
    </Navigation>
  </Drawer>
)
