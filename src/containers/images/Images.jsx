import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as Actions from 'actions/images';

class Images extends Component {
  componentWillMount() {
    this.props.fetchImages();
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  handleChange() {
  }

  render() {
    const {images} = this.props;

    return (
      <ul>
      {images.map(image => (
        <li key={image.Id}>{image.Id}</li>
      ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  images: state.imagesReducer.images
});

const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Images);
