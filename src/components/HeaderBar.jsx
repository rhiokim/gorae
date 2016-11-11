import React from 'react';
import {Link} from 'react-router';
import {
  Header, HeaderRow, FABButton, Icon, Navigation
} from 'react-mdl';
// import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

export const HeaderBar = props => (
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
        <Link to="/dashboard/containers">Containers</Link>
        <Link to="/dashboard/images">Images</Link>
        <Link to="/dashboard/networks">Networks</Link>
        <Link to="/dashboard/volumes">Volumes</Link>
        <Link to="/dashboard/daemon">Daemon</Link>
        <Link to="/dashboard/events">Events</Link>
      </Navigation>
    </HeaderRow>
    <FABButton ripple colored accent mini className="mdl-shadow--4dp" id="add">
      <Icon name="add" />
      <span className="visuallyhidden">Add</span>
    </FABButton>
  </Header>
);
