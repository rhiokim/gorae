import React, {PropTypes} from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';
import {
  Layout, Content, Grid, Cell, Menu, MenuItem,
  Button, IconButton, Icon, Card, CardText, CardActions
} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

import HeaderBarSimple from '../components/HeaderBarSimple';
import FooterBar from '../components/FooterBar';
import {SideBar} from '../components/SideBar';

const propTypes = {
  route: PropTypes.object
};

export default class Home extends React.Component {
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
        <div className="row">
          <div className="col-sm-6">
            <Card>
              <CardText>
                <h4>Features</h4>
                Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum esse.
              </CardText>
              <CardActions>
                <Button href="#">Read our features</Button>
              </CardActions>
            </Card>
          </div>
          <div className="col-sm-6">
          </div>
        </div>
        <Helmet title="Home" />
        <Grid component="section" className="section--center mb-20" shadow={0} noSpacing>
          <Cell component="header" col={3} tablet={2} phone={4} className={classNames('section__play-btn', getColorClass('teal', 100), getTextColorClass('white'))}>
            <Icon name="play_circle_filled" />
          </Cell>
          <Cell component={Card} col={9} tablet={6} phone={4}>

            <CardText>
              <h4>Features</h4>
              Dolore ex deserunt aute fugiat aute nulla ea sunt aliqua nisi cupidatat eu. Nostrud in laboris labore nisi amet do dolor eu fugiat consectetur elit cillum esse.
            </CardText>
            <CardActions>
              <Button href="#">Read our features</Button>
            </CardActions>
          </Cell>
          <IconButton name="more_vert" id="btn1" ripple style={{right: '0', top: '0'}}/>
          <Menu target="btn1" align="right" valign="bottom">
            <MenuItem>Lorem</MenuItem>
            <MenuItem disabled>Ipsum</MenuItem>
            <MenuItem>Dolor</MenuItem>
          </Menu>
        </Grid>
        <Grid component="section" className="section--center mb-20" shadow={0} noSpacing>
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
            <IconButton name="more_vert" id="btn2" ripple style={{right: '0', top: '0'}} />
            <Menu target="btn2" align="right" valign="bottom">
              <MenuItem>Lorem</MenuItem>
              <MenuItem disabled>Ipsum</MenuItem>
              <MenuItem>Dolor</MenuItem>
            </Menu>
          </Cell>
        </Grid>
        <Grid component="section" className="section--center mb-20" shadow={0} noSpacing>
          <IconButton name="more_vert" id="demo-menu-lower-left" style={{right: '0', top: '0'}} />
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
          <IconButton name="more_vert" id="btn3" ripple style={{right: '0', top: '0'}} />
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

  renderFeatures() {
    return (
      <div>
        <Grid component="section" className="section--center" noSpacing>
          <Cell col={12}>
            <h4>Features</h4>
            Minim duis incididunt est cillum est ex occaecat consectetur. Qui sint ut et qui nisi cupidatat. Reprehenderit nostrud proident officia exercitation anim et pariatur ex.
            <ul className="toc">
              <h4>Contents</h4>
              <a href="#lorem1">Lorem ipsum</a>
              <a href="#lorem2">Lorem ipsum</a>
              <a href="#lorem3">Lorem ipsum</a>
              <a href="#lorem4">Lorem ipsum</a>
              <a href="#lorem5">Lorem ipsum</a>
            </ul>

            <h5 id="lorem1">Lorem ipsum dolor sit amet</h5>
            Excepteur et pariatur officia veniam anim culpa cupidatat consequat ad velit culpa est non.
            <ul>
              <li>Nisi qui nisi duis commodo duis reprehenderit consequat velit aliquip.</li>
              <li>Dolor consectetur incididunt in ipsum laborum non et irure pariatur excepteur anim occaecat officia sint.</li>
              <li>Lorem labore proident officia excepteur do.</li>
            </ul>

            <p>Sit qui est voluptate proident minim cillum in aliquip cupidatat labore pariatur id tempor id. Proident occaecat occaecat sint mollit tempor duis dolor cillum anim. Dolore sunt ea mollit fugiat in aliqua consequat nostrud aliqua ut irure in dolore. Proident aliqua culpa sint sint exercitation. Non proident occaecat reprehenderit veniam et proident dolor id culpa ea tempor do dolor. Nulla adipisicing qui fugiat id dolor. Nostrud magna voluptate irure veniam veniam labore ipsum deserunt adipisicing laboris amet eu irure. Sunt dolore nisi velit sit id. Nostrud voluptate labore proident cupidatat enim amet Lorem officia magna excepteur occaecat eu qui. Exercitation culpa deserunt non et tempor et non.</p>
            <p>Do dolor eiusmod eu mollit dolore nostrud deserunt cillum irure esse sint irure fugiat exercitation. Magna sit voluptate id in tempor elit veniam enim cupidatat ea labore elit. Aliqua pariatur eu nulla labore magna dolore mollit occaecat sint commodo culpa. Eu non minim duis pariatur Lorem quis exercitation. Sunt qui ex incididunt sit anim incididunt sit elit ad officia id.</p>
            <p id="lorem2">Tempor voluptate ex consequat fugiat aliqua. Do sit et reprehenderit culpa deserunt culpa. Excepteur quis minim mollit irure nulla excepteur enim quis in laborum. Aliqua elit voluptate ad deserunt nulla reprehenderit adipisicing sint. Est in eiusmod exercitation esse commodo. Ea reprehenderit exercitation veniam adipisicing minim nostrud. Veniam dolore ex ea occaecat non enim minim id ut aliqua adipisicing ad. Occaecat excepteur aliqua tempor cupidatat aute dolore deserunt ipsum qui incididunt aliqua occaecat sit quis. Culpa sint aliqua aliqua reprehenderit veniam irure fugiat ea ad.</p>
            <p>Eu minim fugiat laborum irure veniam Lorem aliqua enim. Aliqua veniam incididunt consequat irure consequat tempor do nisi deserunt. Elit dolore ad quis consectetur sint laborum anim magna do nostrud amet. Ea nulla sit consequat quis qui irure dolor. Sint deserunt excepteur consectetur magna irure. Dolor tempor exercitation dolore pariatur incididunt ut laboris fugiat ipsum sunt veniam aute sunt labore. Non dolore sit nostrud eu ad excepteur cillum eu ex Lorem duis.</p>
            <p>Id occaecat velit non ipsum occaecat aliqua quis ut. Eiusmod est magna non esse est ex incididunt aute ullamco. Cillum excepteur sint ipsum qui quis velit incididunt amet. Qui deserunt anim enim laborum cillum reprehenderit duis mollit amet ad officia enim. Minim sint et quis aliqua aliqua do minim officia dolor deserunt ipsum laboris. Nulla nisi voluptate consectetur est voluptate et amet. Occaecat ut quis adipisicing ad enim. Magna est magna sit duis proident veniam reprehenderit fugiat reprehenderit enim velit ex. Ullamco laboris culpa irure aliquip ad Lorem consequat veniam ad ipsum eu. Ipsum culpa dolore sunt officia laborum quis.</p>

            <h5 id="lorem3">Lorem ipsum dolor sit amet</h5>

            <p id="lorem4">Eiusmod nulla aliquip ipsum reprehenderit nostrud non excepteur mollit amet esse est est dolor. Dolore quis pariatur sit consectetur veniam esse ullamco duis Lorem qui enim ut veniam. Officia deserunt minim duis laborum dolor in velit pariatur commodo ullamco eu. Aute adipisicing ad duis labore laboris do mollit dolor cillum sunt aliqua ullamco. Esse tempor quis cillum consequat reprehenderit. Adipisicing proident anim eu sint elit aliqua anim dolore cupidatat fugiat aliquip qui.</p>
            <p id="lorem5">Nisi eiusmod esse cupidatat excepteur exercitation ipsum reprehenderit nostrud deserunt aliqua ullamco. Anim est irure commodo eiusmod pariatur officia. Est dolor ipsum excepteur magna aliqua ad veniam irure qui occaecat eiusmod aute fugiat commodo. Quis mollit incididunt amet sit minim velit eu fugiat voluptate excepteur. Sit minim id pariatur ex cupidatat cupidatat nostrud nostrud ipsum.</p>
            <p>Enim ea officia excepteur ad veniam id reprehenderit eiusmod esse mollit consequat. Esse non aute ullamco Lorem aliqua qui dolore irure eiusmod aute aliqua proident labore aliqua. Ipsum voluptate voluptate exercitation laborum deserunt nulla elit aliquip et minim ex veniam. Duis cupidatat aute sunt officia mollit dolor ad elit ad aute labore nostrud duis pariatur. In est sint voluptate consectetur velit ea non labore. Ut duis ea aliqua consequat nulla laboris fugiat aute id culpa proident. Minim eiusmod laboris enim Lorem nisi excepteur mollit voluptate enim labore reprehenderit officia mollit.</p>
            <p>Cupidatat labore nisi ut sunt voluptate quis sunt qui ad Lorem esse nisi. Ex esse velit ullamco incididunt occaecat dolore veniam tempor minim adipisicing amet. Consequat in exercitation est elit anim consequat cillum sint labore cillum. Aliquip mollit laboris ad labore anim.</p>
          </Cell>
        </Grid>
      </div>
    );
  }

  renderActiveTabContent() {
    switch (this.state.activeHeaderTab) {
      case 0: return this.renderTabOverview();
      case 1: return this.renderFeatures();
      default: return <div>Nothing to see here :-)</div>;
    }
  }

  render() {
    // const post = this.props.route.page.data;
    // const title = post.title === config.siteTitle || !post.title
    //     ? config.siteTitle
    //     : `${post.title} | ${config.siteTitle}`;

    return (
      <Layout className={classNames('mdl-demo', 'mdl-base')}>
        <HeaderBarSimple />
        <SideBar />
        <Content component="main">
          <div className="react-mdl-layout__tab-panel">
            {this.renderActiveTabContent()}
          </div>
          <FooterBar />
        </Content>
      </Layout>
    );
  }
}

Text.propTypes = propTypes;
