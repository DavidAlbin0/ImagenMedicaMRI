import { View, Text, ActivityIndicator} from 'react-native';
import { Image } from 'react-native-elements';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { StyleSheet } from 'react-native';

export default function CarouselHome({ images, height, width }) {
  const renderItem = ({ item }) => {
    return (
      <Image
        style={{ width, height }}
        PlaceholderContent={<ActivityIndicator color="#fff" />}
        source={{ uri: item }}
      />
    );
  }

  return (
    <Carousel
      layout={"default"}
      data={images}
      sliderWidth={width}
      itemWidth={width}
      itemHeight={height}
      renderItem={renderItem}
    />
  )
}

const styles = StyleSheet.create({});
