import React, {Component} from 'react';
import classNames from 'classnames';

import {getTextColorClass} from 'react-mdl/lib/utils/palette';

// import * as Actions from '../../actions/container';

export default class Version extends Component {
  render() {
    const {info} = this.props;
    return (
      <div>
        <table style={{width: '100%'}}>
          <tbody>
            <tr>
              <td style={{width: '200px'}}>Docker Version</td>
              <td>{info.Version}</td>
            </tr>
            <tr>
              <td style={{width: '200px'}}>API Version</td>
              <td><a href={`https://docs.docker.com/engine/reference/api/docker_remote_api_v${info.ApiVersion}`} target="_blank">{info.ApiVersion}</a></td>
            </tr>
            <tr>
              <td style={{width: '200px'}}>Go Version</td>
              <td>{info.GoVersion}</td>
            </tr>
            <tr>
              <td style={{width: '200px'}}>Latest Commit</td>
              <td>{info.GitCommit}</td>
            </tr>
            <tr>
              <td style={{width: '200px'}}>System</td>
              <td>{info.Os}<sup className={classNames(getTextColorClass('grey', 500))}>os</sup> - {info.Arch}<sup className={classNames(getTextColorClass('grey', 500))}>architecture</sup> - {info.KernelVersion}<sup className={classNames(getTextColorClass('grey', 500))}>kernel</sup></td>
            </tr>
            <tr>
              <td style={{width: '200px'}}>Build Time</td>
              <td>{info.BuildTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
