import React from 'react';
import PropTypes from 'prop-types';

function Video({ srcVideo }) {
  const videoURL = srcVideo.replace('watch?v=', 'embed/');
  return (
    <iframe
      data-testid="video"
      src={ videoURL }
      title="teste"
      width="320"
      height="220"
      frameBorder="0"
      allowFullScreen
    />
  );
}

Video.propTypes = {
  srcVideo: PropTypes.string.isRequired,
};

export default Video;
