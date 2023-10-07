/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {faker} from '@faker-js/faker';
import {StatusBar, View, Image, Text, Animated} from 'react-native';
// const {width, height} = Dimensions.get('screen');

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, _i) => {
  return {
    key: faker.string.uuid(),
    image: faker.image.avatar(),
    name: faker.internet.userName(),
    birthdate: faker.date.birthdate(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 60;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Animated.FlatList
        data={DATA}
        keyExtractor={item => item.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const scale = scrollY.interpolate({
            outputRange: [1, 1, 1, 0],
            inputRange,
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 13,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 18, opacity: 0.7, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
