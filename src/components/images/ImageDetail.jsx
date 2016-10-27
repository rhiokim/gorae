import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';
// import {whyDidYouUpdate} from 'why-did-you-update';
import DocumentTitle from 'react-document-title';
import {
  Layout, Header, Tab, Content, Grid, Cell,
  Button, IconButton, Card, CardText, CardActions,
  Menu, MenuItem, Footer, FooterSection, FooterLinkList,
  } from 'react-mdl';
import {Tabs} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import * as Actions from '../../actions/image';

// if (process.env.NODE_ENV !== 'production') {
// //   whyDidYouUpdate(React);
// }

class ImageDetail extends Component {
  constructor(...args) {
    super(...args);
    this.state = {activeTab: 0};
  }

  componentWillMount() {
    const {id} = this.props.params;
    this.props.fetchImage(id);
    this.props.fetchImageHistory(id);
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  renderImageHistory() {
    const {histories} = this.props;
    return (
      <div className="history">
        {histories.map((history, i) => {
          const id = history.Id.replace('sha256:', '');
          console.log(id)
          return (
            <Grid key={i} component="section" className="section--center" shadow={0} noSpacing>
              <Cell component={Card} col={12}>
                <CardText>
                  <h5>{id} <TimeAgo component="small" date={history.Created*1000}/></h5>
                  <pre>{history.CreatedBy}</pre>
                </CardText>
              </Cell>
              <IconButton name="more_vert" id={`btn${i}`} ripple />
              <Menu target={`btn${i}`} align="right" valign="bottom">
                <MenuItem>Lorem</MenuItem>
                <MenuItem disabled>Ipsum</MenuItem>
                <MenuItem>Dolor</MenuItem>
              </Menu>
            </Grid>
          );
        })}
      </div>
    )
  }

  renderBasicInformation() {
    const {image} = this.props;
    return (
      <Grid component="section" className="section--center" shadow={0} noSpacing>
        <Cell component={Card} col={12}>
          <CardText>
            <h4>Basic Information</h4>
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Id:</td><td>{image.Id}</td>
                </tr>
                <tr>
                  <td>Created:</td><td>{image.Created}</td>
                </tr>
                <tr>
                  <td>Parent:</td><td>{image.Parent}</td>
                </tr>
                <tr>
                  <td>Size:</td><td>{image.Size}</td>
                </tr>
                <tr>
                  <td>Built with:</td><td>{image.DockerVersion}/{image.Os}/{image.Architecture}</td>
                </tr>
              </tbody>
            </table>
            Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum esse. Pariatur occaecat nisi laboris tempor laboris eiusmod qui id Lorem esse commodo in. Exercitation aute dolore deserunt culpa consequat elit labore incididunt elit anim.
          </CardText>
          <CardActions>
            <Button href="#">Read our features</Button>
          </CardActions>
        </Cell>
        <IconButton name="more_vert" id="btn3" ripple />
        <Menu target="btn3" align="right" valign="bottom">
          <MenuItem>Lorem</MenuItem>
          <MenuItem disabled>Ipsum</MenuItem>
          <MenuItem>Dolor</MenuItem>
        </Menu>
      </Grid>
    );
  }

  renderActiveTabContent() {
    switch (this.state.activeTab) {
        case 0: return this.renderBasicInformation();
        case 1: return this.renderImageHistory();
        default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    // const {image} = this.props;
    // const {activeTab} = this.state;
    return (
      <DocumentTitle title="Image Detail">
        <div className={classNames('image', 'mdl-demo', 'mdl-base')}>
          <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>

            <Header className={classNames('demo-header', getColorClass('grey', 100), getTextColorClass('grey', 800))} title="Image Detail" scroll>
            </Header>
            {/*<Header className={getColorClass('primary')} title="Material Design Lite" scroll>
              <HeaderRow className="mdl-layout--large-screen-only" />
              <HeaderRow className="mdl-layout--large-screen-only">
                <h3>Name &amp; Title</h3>
              </HeaderRow>
              <HeaderRow className="mdl-layout--large-screen-only" />
              <HeaderTabs className={getTextColorClass('primary-dark')} activeTab={this.state.activeHeaderTab} onChange={this.onChangeHeaderTab} ripple>
                <Tab>Dashboard</Tab>
                <Tab>Containers</Tab>
                <Tab>Containers Network</Tab>
                <Tab>Images</Tab>
                <Tab>Volumes</Tab>
                <FABButton ripple colored accent className="mdl-shadow--4dp" id="add">
                  <Icon name="add" />
                  <span className="visuallyhidden">Add</span>
                </FABButton>
              </HeaderTabs>
            </Header>*/}
            <Content component="main">
                  {/*this.renderActiveTabContent()*/}
              <Tabs className="mb-20" activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                  <Tab>Basic Information</Tab>
                  <Tab>History</Tab>
              </Tabs>
              <section>
                {this.renderActiveTabContent()}
              </section>
              <Footer size="mega">
                <FooterSection type="bottom" logo="More Information">
                  <FooterLinkList>
                    <a href="https://developers.google.com/web/starter-kit/">Web Starter Kit</a>
                    <a href="#">Help</a>
                    <a href="#">Privacy & Terms</a>
                  </FooterLinkList>
                </FooterSection>
              </Footer>
            </Content>
          </Layout>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  image: state.imageReducer.image,
  histories: state.imageHistoryReducer.histories
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetail);
