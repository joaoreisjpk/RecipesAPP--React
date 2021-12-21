import React from 'react';

interface VideoProps {
  srcVideo: string;
}

function Video({ srcVideo }: VideoProps) {
  const videoURL = srcVideo.replace('watch?v=', 'embed/');
  return (
    <iframe
      data-testid="video"
      src={ videoURL }
      title="teste"
      frameBorder="0"
      allowFullScreen
    />
  );
}

export default Video;
