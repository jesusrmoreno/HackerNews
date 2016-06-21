require('./images.scss');
import React from 'react';

export const Image = (props) => {
  return (
    <div className="image">
      <img className="image__media" src={props.src} />
      <p className="image__caption">{props.caption}</p>
    </div>
  );
}

Image.propTypes = {
  src: React.PropTypes.string,
  caption: React.PropTypes.string,
};

Image.defaultProps = {
  src: 'https://img-standin.herokuapp.com/Image/f2f2f2-400-700.png',
  caption: 'Untitled',
};


export const Thumbnail = (props) => {
  return (
    <div className="thumbnail" style={{
      width: props.width,
      height: props.height,
    }}>
      <img
        className="thumbnail__media"
        src={props.src}
        width={props.width}
        height={props.height}
      />
    </div>
  )
};

Thumbnail.propTypes = {
  src: React.PropTypes.string,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
};

Thumbnail.defaultProps = {
  src: 'https://img-standin.herokuapp.com/thumbnail/f2f2f2-250-250.png'
};
