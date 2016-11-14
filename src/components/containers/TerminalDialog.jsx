import React from 'react';
import {
  Button, Dialog, DialogActions
} from 'react-mdl';

import Terminal from './Terminal';

class TerminalDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {container, onCancel, style} = this.props;

    return (
      <Dialog open={true} style={style} onCancel={onCancel}>
        <Terminal id={container.Id} cmd="sh" />
        <DialogActions>
          <Button type='button' onClick={onCancel}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TerminalDialog;
