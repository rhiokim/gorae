import React from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import {
  Layout, Content, Grid, Cell,
  Button, IconButton, Card, CardText, CardActions,
  Menu, MenuItem, CardTitle, CardMenu
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import FooterBar from './FooterBar';
import Cpu from './dashboard/Cpu';
import Memory from './dashboard/Memory';
import Network from './dashboard/Network';
import Disk from './dashboard/Disk';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeHeaderTab = this.onChangeHeaderTab.bind(this);

    this.state = {
      activeHeaderTab: 0
    };
  }

  onChangeHeaderTab(tabId) {
    this.setState({
      activeHeaderTab: tabId
    });
  }

  renderTabOverview() {
    return (
      <div>
        <Helmet title="Dashboard" />

        <Grid component="section" className="section--center mt-40" noSpacing>
          <div className="col-sm-3 no-padding">
            <Card shadow={0} style={{width: 'calc(100% - 5px)', minHeight: '150px'}}>
              <CardTitle className={classNames(getTextColorClass('light-blue', 200))}>
                Images
              </CardTitle>
              <CardText className={classNames(getTextColorClass('light-blue', 500))} style={{fontSize: '2em', margin: 0, textAlign: 'right', padding: '16px', width: 'calc(100% - 40px)'}}>
              24
              </CardText>
              <CardMenu style={{right: '5px', top: '5px'}}>
                <Link to="/images" className={classNames(getTextColorClass('light-blue', 100))}>
                  <IconButton name="more_horiz" ripple />
                </Link>
              </CardMenu>
            </Card>
          </div>
          <div className="col-sm-3 no-padding pl-5">
            <Card shadow={0} style={{width: 'calc(100% - 5px)', minHeight: '150px'}}>
              <CardTitle className={classNames(getTextColorClass('cyan', 200))}>
                Containers
              </CardTitle>
              <CardText className={classNames(getTextColorClass('cyan', 500))} style={{fontSize: '2em', margin: 0, textAlign: 'right', padding: '16px', width: 'calc(100% - 40px)'}}>
              57
              </CardText>
              <CardMenu style={{right: '5px', top: '5px'}}>
                <Link to="/containers" className={classNames(getTextColorClass('cyan', 100))}>
                  <IconButton name="more_horiz" ripple />
                </Link>
              </CardMenu>
            </Card>
          </div>
          <div className="col-sm-3 no-padding pl-5">
            <Card shadow={0} style={{width: 'calc(100% - 5px)', minHeight: '150px'}}>
              <CardTitle className={classNames(getTextColorClass('indigo', 200))}>
                Networks
              </CardTitle>
              <CardText className={classNames(getTextColorClass('indigo', 500))} style={{fontSize: '2em', margin: 0, textAlign: 'right', padding: '16px', width: 'calc(100% - 40px)'}}>
              5
              </CardText>
              <CardMenu style={{right: '5px', top: '5px'}}>
                <Link to="/networks" className={classNames(getTextColorClass('indigo', 100))}>
                  <IconButton name="more_horiz" ripple />
                </Link>
              </CardMenu>
            </Card>
          </div>
          <div className="col-sm-3 no-padding pl-5">
            <Card shadow={0} style={{width: 'calc(100%)', minHeight: '150px'}}>
              <CardTitle className={classNames(getTextColorClass('orange', 200))}>
                Volumes
              </CardTitle>
              <CardText className={classNames(getTextColorClass('orange', 500))} style={{fontSize: '2em', margin: 0, textAlign: 'right', padding: '16px', width: 'calc(100% - 40px)'}}>
              2
              </CardText>
              <CardMenu style={{right: '5px', top: '5px'}}>
                <Link to="/volumes" className={classNames(getTextColorClass('orange', 100))}>
                  <IconButton name="more_horiz" ripple />
                </Link>
              </CardMenu>
            </Card>
          </div>
        </Grid>

        <Grid component="section" className="section--center bg-white" shadow={0}>
          <div className="col-sm-6 ">
            <CardText>
              <h4>Cluster Details</h4>
              <table className="table table-framed">
                <tbody>
                  <tr>
                    <td width="130">Name</td>
                    <td><span className="text-bold">Worker1-2</span></td>
                  </tr>
                  <tr>
                    <td>Role</td>
                    <td>Worker Node</td>
                  </tr>
                  <tr>
                    <td>Parent Node</td>
                    <td>dz7rus57tgsu6o9a91nu99n99</td>
                  </tr>
                  <tr>
                    <td>Created</td>
                    <td>23 days ago</td>
                  </tr>
                  <tr>
                    <td>Updated</td>
                    <td>38 minutes ago</td>
                  </tr>
                </tbody>
              </table>
            </CardText>
          </div>
          <div className="col-sm-6 bg-white">
            <CardText>
              <h4>Resources Usage</h4>
              <table className="table table-framed">
                <tbody>
                  <tr>
                    <td width="130">CPU 1</td>
                    <td><Cpu /></td>
                  </tr>
                  <tr>
                    <td>CPU 2</td>
                    <td><Cpu /></td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td><Memory /></td>
                  </tr>
                  <tr>
                    <td>Network I/O</td>
                    <td><Network /></td>
                  </tr>
                  <tr>
                    <td>Disk I/O</td>
                    <td><Disk /></td>
                  </tr>
                </tbody>
              </table>
            </CardText>
          </div>
        </Grid>
        <Grid component="section" className="section--center" shadow={0} noSpacing>
          <Cell component={Card} col={12}>
            <Grid component={CardText} noSpacing>
              <Cell component="h4" col={12}>Details</Cell>
              <Cell className="section__circle-container" col={2} phone={1}>
                <div className={classNames('section__circle-container__circle', getColorClass('primary'))}></div>
              </Cell>
              <Cell className="section__text" col={10} tablet={6} phone={3}>
                <h5>Lorem ipsum dolor sit amet</h5>
                Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
              </Cell>
              <Cell className="section__circle-container" col={2} phone={1}>
                <div className={classNames('section__circle-container__circle', getColorClass('primary'))}></div>
              </Cell>
              <Cell className="section__text" col={10} tablet={6} phone={3}>
                <h5>Lorem ipsum dolor sit amet</h5>
                Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
              </Cell>
              <Cell className="section__circle-container" col={2} phone={1}>
                <div className={classNames('section__circle-container__circle', getColorClass('primary'))}></div>
              </Cell>
              <Cell className="section__text" col={10} tablet={6} phone={3}>
                <h5>Lorem ipsum dolor sit amet</h5>
                Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Duis nulla tempor do aute et eiusmod velit exercitation nostrud quis <a href="#">proident minim</a>.
              </Cell>
            </Grid>
            <CardActions>
              <Button href="#">Read our features</Button>
            </CardActions>
            <IconButton name="more_vert" id="btn2" ripple />
            <Menu target="btn2" align="right" valign="bottom">
              <MenuItem>Lorem</MenuItem>
              <MenuItem disabled>Ipsum</MenuItem>
              <MenuItem>Dolor</MenuItem>
            </Menu>
          </Cell>
        </Grid>
        <Grid component="section" className="section--center" shadow={0} noSpacing>
          <IconButton name="more_vert" id="demo-menu-lower-left" />
          <Menu target="demo-menu-lower-left">
            <MenuItem>Some Action</MenuItem>
            <MenuItem>Another Action</MenuItem>
            <MenuItem disabled>Disabled Action</MenuItem>
            <MenuItem>Yet Another Action</MenuItem>
          </Menu>
          <Cell component={Card} col={12}>
            <CardText>
              <h4>Technology</h4>
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
        <Grid component="section" className={classNames('section--footer', getColorClass('white'))}>
          <Cell className="section__circle-container" col={2} phone={1}>
            <div className={classNames('section__circle-container__circle section__circle--big', getColorClass('accent'))}></div>
          </Cell>
          <Cell className="section__text" col={4} tablet={6} phone={3}>
            <h5>Lorem ipsum dolor sit amet</h5>
            Qui sint ut et qui nisi cupidatat. Reprehenderit nostrud proident officia exercitation anim et pariatur ex.
          </Cell>
          <Cell className="section__circle-container" col={2} phone={1}>
            <div className={classNames('section__circle-container__circle section__circle--big', getColorClass('accent'))}></div>
          </Cell>
          <Cell className="section__text" col={4} tablet={6} phone={3}>
            <h5>Lorem ipsum dolor sit amet</h5>
            Qui sint ut et qui nisi cupidatat. Reprehenderit nostrud proident officia exercitation anim et pariatur ex.
          </Cell>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Gorae" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          <Content component="main">
            {this.renderTabOverview()}
            <FooterBar />
          </Content>
        </Layout>
      </div>
    );
  }
}
