import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import Animated, { FadeIn, useAnimatedRef } from 'react-native-reanimated';

export default function filtre({ route, navigation }) {
  const viewRef = useAnimatedRef(null);
  const [bgColor, setBgColor] = useState();

  return (
    <Animated.View 
      ref={viewRef} 
      entering={FadeIn.duration(800)}
      style={[Styles.container, { backgroundColor: bgColor }]}
    >
      {/* Afficher le Header avec les propriétés passées */}
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
      />

      {/* Contenu de l'écran */}
      <View style={[Styles.container, { backgroundColor: bgColor }]}>
      <Text>  Bonjour Filtre</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
