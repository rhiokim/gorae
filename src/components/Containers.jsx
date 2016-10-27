import React, {Component} from 'react';
// import {bindActionCreators} from 'redux';
// import {connect} from 'react-redux';
// import {Link} from 'react-router';
import classNames from 'classnames';
// import {whyDidYouUpdate} from 'why-did-you-update';
import Helmet from 'react-helmet';
import {Layout} from 'react-mdl';
import {getColorClass, getTextColorClass} from 'react-mdl/lib/utils/palette';

// import * as Actions from 'actions/containers';

// if (process.env.NODE_ENV !== 'production') {
// //   whyDidYouUpdate(React);
// }

class Containers extends Component {
  // constructor(...args) {
  //   super(...args);

    // this.handleMore = this.handleMore.bind(this);

    // this.state = {
    //   params: {
    //     all: 0,
    //     limit: 2,
    //     size: 1,
    //     filters: {
    //     }
    //   }
    // };
  // }

  componentWillMount() {
    // this.props.fetchContainers(this.state.params);
  }

  componentDidMount() {
  }

  // componentWillReceiveProps(nextProps) {
    // this.setState({
    //   params: {
    //     ...this.state.params,
    //     before: nextProps.before
    //   }
    // });
  // }

  handleChange() {
  }

  handleMore() {
    // this.props.fetchContainers(this.state.params);
  }

  render() {
    // const {containers, before} = this.props;

    return (
      <div className={classNames('mdl-demo', 'mdl-base')}>
        <Helmet title="Containers" />
        <Layout fixedHeader className={classNames(getColorClass('grey', 100), getTextColorClass('grey', 700))}>
          {this.props.children}
        </Layout>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   containers: state.containersReducer.containers,
//   before: state.containersReducer.before
// });

// const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default Containers;//connect(mapStateToProps, mapDispatchToProps)();
