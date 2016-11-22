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
        <Link to="/">Dashboard</Link>
        <Link to="/containers">Containers</Link>
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
);
