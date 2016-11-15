import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { DataTable, TableHeader, IconButton, Spinner, Textfield } from 'react-mdl';

import * as Actions from '../../actions/container';

class Processes extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._options = '';

    this.state = {
      isFetching: true,
      params: {
        ps_args: ''
      }
    };
  }

  handleClick() {
    this.props.fetchContainerProcess(this.props.id, {ps_args: this._options});
  }

  handleChange(e) {
    this._options = e.target.value;
  }

  componentWillMount() {
    this.props.fetchContainerProcess(this.props.id, this.state.params);
  }

  componentWillReceiveProps(nextProps) {
    const {Titles, Processes} = nextProps.process;
    let processes = [];
    let process;

    Processes.forEach((item, i) => {
      process = {};
      Titles.forEach((key, j) => {
        process[key] = item[j];
      });
      processes.push(process);
    });

    this.processes = processes;
    this.setState({
      isFetching: false
    });
  }

  renderActiveTabContent() {}

  render() {
    // this.props.process
    const {isFetching} = this.state;
    const {Titles} = this.props.process;
    const {processes} = this;
    return (
      isFetching ? <Spinner /> :
        <div>
          <Textfield
            label="options (aux)"
            onChange={this.handleChange}
            style={{width: '150px'}} />
          <IconButton name="find_replace" colored onClick={this.handleClick} />
          <DataTable sortable rowKeyColumn="id" rows={processes}>
            {Titles.map(title => {
              return (
                <TableHeader key={title} name={title} tooltip={title}>{title}</TableHeader>
              );
            })}
          </DataTable>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  process: state.containerReducer.process
});
const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Processes);
