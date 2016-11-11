import React from 'react';
import {Link} from 'react-router';
import {
  Footer, FooterSection, FooterLinkList,
  FooterDropDownSection
} from 'react-mdl';

export default class FooterBar extends React.Component {
  render() {
    return (
      <Footer size="mega">
        <FooterSection type="middle">
          <FooterDropDownSection title="Features">
            <FooterLinkList>
              <Link to="/about">About</Link>
              <a href="#">Terms</a>
              <a href="#">Partners</a>
              <a href="#">Updates</a>
            </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="Details">
            <FooterLinkList>
              <a href="#">Specs</a>
              <a href="#">Tools</a>
              <a href="#">Resources</a>
            </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="Technology">
            <FooterLinkList>
              <a href="#">How it works</a>
              <a href="#">Patterns</a>
              <a href="#">Usage</a>
              <a href="#">Products</a>
              <a href="#">Contracts</a>
            </FooterLinkList>
          </FooterDropDownSection>
          <FooterDropDownSection title="FAQ">
            <FooterLinkList>
              <a href="#">Questions</a>
              <a href="#">Answers</a>
              <a href="#">Contact Us</a>
            </FooterLinkList>
          </FooterDropDownSection>
        </FooterSection>
        <FooterSection type="bottom" logo="More Information">
          <FooterLinkList>
            <Link to="/about">About</Link>
            <a href="https://github.com/rhiokim/gorae-swarm">GitHub</a>
            <a href="#">Help</a>
            <a href="#">Privacy & Terms</a>
          </FooterLinkList>
        </FooterSection>
      </Footer>
    );
  }
}
