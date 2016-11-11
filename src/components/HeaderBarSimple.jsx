import React from 'react';
import {Link} from 'react-router';
import {
  Header, Navigation, HeaderRow, FABButton, Icon
} from 'react-mdl';

export default class HeaderBarSimple extends React.Component {
  render() {
    return (
      <Header>
        <HeaderRow title={<Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Gorae</Link>}>
          {true ? '' : <Navigation>
            <a href="https://github.com/rhiokim/gorae">
              <Icon name="link" style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                GitHub
            </a>
          </Navigation>}
        </HeaderRow>
        {true ? '' : <HeaderRow className="mdl-layout__header-second-menu">
          <Navigation>
            <Link to="/dashboard">
              <Icon name="dashboard" /> Dashboard
            </Link>
          </Navigation>
        </HeaderRow>}
        <Link to="/swarm">
          <FABButton ripple colored accent mini className="mdl-shadow--4dp" id="add">
            <Icon name="cast_connected" />
            <span className="visuallyhidden">Add</span>
          </FABButton>
        </Link>
      </Header>
    );
  }
}
