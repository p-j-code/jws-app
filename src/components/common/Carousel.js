import React, {useState, useRef} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import ImageViewer from 'react-native-image-zoom-viewer';
import theme from '../../theme';

const Carousel = ({data = [], width, height, style = {}, maxSlides}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleImagePress = index => {
    setSelectedMedia(index);
    setIsVisible(true);
  };

  const handleVideoPress = index => {
    setSelectedMedia(index);
    setIsVideoVisible(true);
  };

  // Limit the data based on maxSlides
  const limitedData = maxSlides ? data.slice(0, maxSlides) : data;

  return (
    <View style={[styles.container, style, {width, height}]}>
      <Animated.FlatList
        ref={flatListRef}
        data={limitedData}
        keyExtractor={item => item._id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width} // Ensures each item snaps correctly
        snapToAlignment="center"
        decelerationRate="fast"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              onPress={() =>
                item.type === 'image'
                  ? handleImagePress(index)
                  : handleVideoPress(index)
              }
              style={[
                styles.item,
                {width, height, transform: [{scale}], opacity},
              ]}>
              <View style={styles.mediaContainer}>
                {item.type === 'image' ? (
                  <Image source={{uri: item.url}} style={styles.image} />
                ) : (
                  <Video
                    source={{uri: item.url}}
                    style={styles.video}
                    resizeMode="contain"
                    paused={index !== selectedMedia || !isVideoVisible}
                    controls={index === selectedMedia && isVideoVisible}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{alignItems: 'center'}}
      />
      {limitedData.length > 1 && (
        <View style={styles.pagination}>
          {limitedData.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotScale = scrollX.interpolate({
              inputRange,
              outputRange: [0.8, 1.2, 0.8],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                style={[
                  styles.dot,
                  {
                    opacity: dotOpacity,
                    transform: [{scale: dotScale}],
                  },
                ]}
              />
            );
          })}
        </View>
      )}

      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={() => setIsVisible(false)}>
        <ImageViewer
          imageUrls={limitedData
            .filter(item => item.type === 'image')
            .map(item => ({url: item.url}))}
          index={selectedMedia}
        />
      </Modal>

      <Modal
        visible={isVideoVisible}
        transparent={true}
        onRequestClose={() => setIsVideoVisible(false)}>
        <View style={styles.videoModal}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsVideoVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Video
            source={{uri: limitedData[selectedMedia]?.url}}
            style={styles.fullScreenVideo}
            resizeMode="contain"
            controls
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.subtle,
    borderRadius: theme.shape.borderRadius,
    shadowColor: theme.colors.border.main,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  mediaContainer: {
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.default,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    width: Dimensions.get('window').width, // Use full screen width for the pagination
    justifyContent: 'center', // Center the pagination dots
    flexWrap: 'wrap', // Allow dots to wrap to the next line if they overflow
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary.main,
    marginHorizontal: 3,
  },
  videoModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Carousel;
