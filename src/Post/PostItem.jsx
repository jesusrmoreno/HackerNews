import React from 'react';
import {
  Image
} from '../Images/Images.jsx';

export const PostItem = React.createClass({
  render() {
    return (
      <div className="post_item">
        <Image
          src={this.props.imageURL}
          alt={this.props.title}
        />
        <p>{this.props.title}</p>
      </div>
    );
  }
});
