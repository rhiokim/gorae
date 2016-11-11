import React from 'react';
import {Link} from 'react-router';
import {Drawer, Navigation, Icon} from 'react-mdl';

import './SideBar.css';

export const SideBar = props => (
  <Drawer title="Gorae">
    <Navigation>
      <Link to="/dashboard">
        <Icon name="dashboard" /> Dashboard
      </Link>
    </Navigation>
    <Navigation>
      <span>RESOURCE</span>
      <Link to="/dashboard/images">
        <Icon name="apps" /> Images
      </Link>
      <Link to="/dashboard/containers">
        <Icon name="event_note" /> Containers
      </Link>
      <Link to="/dashboard/networks">
        <Icon name="event_note" /> Networks
      </Link>
      <Link to="/dashboard/volumes">
        <Icon name="event_note" /> Volumes
      </Link>
    </Navigation>
    <Navigation>
      <span>SETTINGS</span>
      <Link to="/dashboard/events">
        <Icon name="settings" /> Events Log
      </Link>
      <Link to="/dashboard/daemon">
        <Icon name="settings" /> Deamon
      </Link>
      <Link to="/swarm">
        <Icon name="settings" /> Settings
      </Link>
    </Navigation>
  </Drawer>
)
