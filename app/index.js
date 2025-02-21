import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import SplashScreenComponent from './components/SplashScreen';
import * as SplashScreen from 'expo-splash-screen';
import * as Animatable from 'react-native-animatable';
import Animated, { FadeIn, useAnimatedRef } from 'react-native-reanimated';
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
import MyHeader from '../components/MyHeader';
import Icon, { Icons } from '../components/Icons';
import ColorScreen from '../screens/ColorScreen';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home";
import recherche from "./recherche";
import liste from "./liste";
import filtre from "./filtre"
import parametre from "./parametre";
import 'react-native-gesture-handler';

const TabArr = [
  {
    route: 'Accueil',
    label: 'Accueil',
    type: Icons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: Home,
  },
  {
    route: 'Recherchez un Job',
    label: 'Recherchez un Job',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'magnify',
    inActiveIcon: 'magnify',
    component: recherche, 
  },
  {
    route: 'Filtrage de Job',
    label: 'Filtrage de Job',
    type: Icons.Ionicons,
    activeIcon: 'filter',
    inActiveIcon: 'filter',
    component: filtre,
  },
  {
    route: 'Mes Jobs Postés',
    label: 'Mes Jobs Postés',
    type: Icons.Ionicons,
    activeIcon: 'list-circle',
    inActiveIcon: 'list-circle-outline',
    component: liste,
  },
  {
    route: 'Paramètres',
    label: 'Paramètres',
    type: Icons.Ionicons,
    activeIcon: 'settings',
    inActiveIcon: 'settings',
    component: parametre,
  },
];
const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: '0deg' },
        1: { scale: 1.5, rotate: '360deg' },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: '360deg' },
        1: { scale: 1, rotate: '0deg' },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}
    >
      <Animatable.View ref={viewRef} duration={1000}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function App({ route, navigation }) {

  const viewRef = useAnimatedRef(null);
  const [bgColor] = useState(Colors.background);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [hasWaited, setHasWaited] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Empêche le splash screen de se masquer automatiquement
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      // Attendre au moins 3 secondes avant de masquer le splash screen
      const waitAndFinish = async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setHasWaited(true);
      };
      waitAndFinish();
    }
  }, [isAppReady]);

  const onLayoutRootView = async () => {
    if (isAppReady && hasWaited) {
      // Masque le splash screen après le délai
      await SplashScreen.hideAsync();
    }
  };

  if (!isAppReady || !hasWaited) {
    return <SplashScreenComponent onFinish={() => setIsAppReady(true)} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* Ajout de la StatusBar juste ici */}
     <StatusBar backgroundColor="#fcfcfc" translucent={false} />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        {TabArr.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});
