import React, {useRef, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

const MediaItem = ({mediaItem, isActive}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !isActive) {
      videoRef.current.seek(0); // Reset the video to start if it is not active
    }
  }, [isActive]);

  if (mediaItem.type === 'image') {
    return <Image source={{uri: mediaItem.url}} style={styles.media} />;
  }

  if (mediaItem.type === 'video') {
    return (
      <Video
        ref={videoRef}
        source={{uri: mediaItem.url}}
        style={styles.media}
        resizeMode="cover"
        paused={!isActive}
        onError={error => console.log(error)}
      />
    );
  }

  return null;
};

MediaItem.propTypes = {
  mediaItem: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  media: {
    width: '100%',
    height: '100%',
  },
});

export default MediaItem;
