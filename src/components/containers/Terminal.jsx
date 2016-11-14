import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from '../../actions/container';
import './terminal.css';

var term;
var socket;
var buf = '';

function Wetty(argv) {
  this.argv_ = argv;
  this.io = null;
  this.pid_ = -1;
}

Wetty.prototype.run = function() {
  this.io = this.argv_.io.push();

  this.io.onVTKeystroke = this.sendString_.bind(this);
  this.io.sendString = this.sendString_.bind(this);
  this.io.onTerminalResize = this.onTerminalResize.bind(this);
};

Wetty.prototype.sendString_ = function(str) {
  socket.emit('input', str);
};

Wetty.prototype.onTerminalResize = function(col, row) {
  socket.emit('resize', { col: col, row: row });
};

class Terminal extends Component {

  componentWillMount() {
  }

  componentDidMount() {
    const self = this;
    const {id, cmd} = this.props;

    socket = window.io(process.env.__API__, {path: '/wetty/socket.io'});

    socket.on('connect', () => {
      window.lib.init(() => {
        window.hterm.defaultStorage = new window.lib.Storage.Local();
        term = new window.hterm.Terminal();
        window.term = term;
        term.decorate(self.terminal);

        term.setCursorPosition(0, 0);
        term.setCursorVisible(true);
        term.prefs_.set('ctrl-c-copy', true);
        term.prefs_.set('ctrl-v-paste', true);
        term.prefs_.set('use-default-window-copy', true);

        term.runCommandClass(Wetty, document.location.hash.substr(1));
        socket.emit('container', {
          id: id,
          cmd: cmd
        });
        socket.on('ready', () => {
          socket.emit('resize', {
            col: term.screenSize.width,
            row: term.screenSize.height
          });
        });

        if (buf && buf !== '') {
          term.io.writeUTF16(buf);
          buf = '';
        }
      });
    });

    socket.on('output', data => {
      if (!term) {
        buf += data;
        return;
      }
      term.io.writeUTF16(data);
    });

    socket.on('disconnect', () => {
      console.log('Socket.io connection closed');
    });
  }

  renderActiveTabContent() {}

  render() {
    return (
      <div ref={c => this.terminal = c} id="terminal"></div>
    );
  }
}

const mapStateToProps = state => ({
  changes: state.containerReducer.changes
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
