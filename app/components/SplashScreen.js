import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreenComponent({ onFinish }) {
  // Valeur animée pour gérer le fondu du texte
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Démarre un timer pour passer à l'écran suivant après 3.5 secondes
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    // Animation du texte (fade in) qui démarre après 1.5 secondes
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
      delay: 1500,
    });
    
    fadeIn.start();

    // Nettoyage de la temporisation et de l’animation à la sortie
    return () => {
      clearTimeout(timer);
      fadeIn.stop();
    };
  }, [onFinish, fadeAnim]);

  return (
    <View style={styles.root}>
      {/* StatusBar */}
      <StatusBar style="light" backgroundColor="#004AAD" translucent={false} />
      
      <LinearGradient
        colors={['#004AAD', '#4AB8FF']}  // Couleurs pour un dégradé fluide et attractif
        style={styles.gradient}
      >
        <View style={styles.container}>
          <LottieView
            source={require('../../assets/images/animation.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onFinish}
            style={styles.animation}
          />
          <Animated.Text style={[styles.slogan, { opacity: fadeAnim }]}>
            Toum Guili
          </Animated.Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 250,
    height: 250,
  },
  slogan: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
});
