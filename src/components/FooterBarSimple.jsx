import React from 'react';
import {Link} from 'react-router';
import {Footer, FooterSection, FooterLinkList} from 'react-mdl';

export default class FooterBarSimple extends React.Component {
  render() {
    return (
      <Footer size="mega" className="mt-20">
        <FooterSection type="bottom" logo="More Information">
          <FooterLinkList>
            <Link to="/about">About</Link>
            <a href="https://github.com/rhiokim/gorae">GitHub</a>
            <a href="#">Help</a>
            <a href="#">Privacy & Terms</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    );
  }
}

