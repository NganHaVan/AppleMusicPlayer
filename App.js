/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// TODO: Tell the diff between xcode project and xcode workspace

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SCREENHEIGHT = Dimensions.get("window").height;
const SCREENWIDTH = Dimensions.get("window").width;

const App = () => {
  let animation = new Animated.ValueXY({
    x: 0,
    y: SCREENHEIGHT - 90
  });
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  let scrollOffset = 0;
  let animatedImageHeight = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 90],
    outputRange: [200, 32],
    extrapolate: "clamp"
  });
  let animatedSongTitleOpacity = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 500, SCREENHEIGHT - 90],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });
  let animatedImageMarginLeft = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 90],
    outputRange: [SCREENWIDTH / 2 - 100, 10],
    extrapolate: "clamp"
  });
  let animatedSongDetailOpacity = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 500, SCREENHEIGHT - 90],
    outputRange: [1, 1, 0],
    extrapolate: "clamp"
  });
  let animatedHeaderHeight = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 90],
    outputRange: [SCREENHEIGHT / 2, 90],
    extrapolate: "clamp"
  });
  let animatedBackgroundColor = animation.y.interpolate({
    inputRange: [0, SCREENHEIGHT - 90],
    outputRange: ["rgba(0,0,0,.5)", "white"],
    extrapolate: "clamp"
  });
  const panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      if (
        (isScrollEnabled && scrollOffset <= 0 && gestureState.dy > 0) ||
        (!isScrollEnabled && gestureState.dy < 0)
      ) {
        return true;
      } else {
        return false;
      }
    },

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
      animation.extractOffset();
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      animation.setValue({ x: 0, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      // Adjust the margin
      if (gestureState.moveY > SCREENHEIGHT - 120) {
        Animated.spring(animation.y, {
          toValue: 0,
          tension: 1
        }).start();
      } else if (gestureState.moveY < 120) {
        Animated.spring(animation.y, {
          toValue: 0,
          tension: 1
        }).start();
      } else if (gestureState.dy < 0) {
        setIsScrollEnabled(true);
        Animated.spring(animation.y, {
          toValue: -SCREENHEIGHT + 120,
          tension: 1 // not bouncing
        }).start();
      } else if (gestureState.dy > 0) {
        setIsScrollEnabled(false);
        Animated.spring(animation.y, {
          toValue: SCREENHEIGHT - 120,
          tension: 1
        }).start();
      }
    }
  });
  const animatedHeight = {
    transform: animation.getTranslateTransform()
  };
  return (
    <Animated.View
      style={{ flex: 1, backgroundColor: animatedBackgroundColor }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          animatedHeight,
          {
            position: "absolute",
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: "white",
            height: SCREENHEIGHT
          }
        ]}
      >
        <ScrollView
          scrollEnabled={isScrollEnabled}
          scrollEventThrottle={16}
          onScrollEvent={event => {
            scrollOffset = event.nativeEvent.contentOffset.y;
          }}
        >
          <Animated.View
            style={{
              height: animatedHeaderHeight,
              borderTopWidth: 1,
              borderTopColor: "#ebe5e5",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{ flex: 4, flexDirection: "row", alignItems: "center" }}
            >
              <Animated.View
                style={{
                  height: animatedImageHeight,
                  width: animatedImageHeight,
                  marginLeft: animatedImageMarginLeft
                }}
              >
                <Image
                  source={require("./assets/hotel-california.jpg")}
                  style={{ height: null, width: null, flex: 1 }}
                />
              </Animated.View>
              <Animated.Text
                style={{
                  opacity: animatedSongTitleOpacity,
                  fontSize: 18,
                  paddingLeft: 10
                }}
              >
                Hotel California (Live)
              </Animated.Text>
            </View>
            <Animated.View
              style={{
                opacity: animatedSongTitleOpacity,
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Ionicons name="md-play" size={32} color="black" />
              <Ionicons name="md-pause" size={32} color="black" />
            </Animated.View>
          </Animated.View>
          <Animated.View
            style={{
              height: animatedHeaderHeight,
              opacity: animatedSongDetailOpacity
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Hotel California (Live)
              </Text>
              <Text style={{ fontSize: 18, color: "#fa95ed" }}>
                Eagles - Hell Freezes Over
              </Text>
            </View>
            <View
              style={{ height: 40, width: SCREENWIDTH, alignItems: "center" }}
            >
              <Slider
                style={{ width: 300 }}
                step={1}
                minimumValue={18}
                maximumValur={71}
              />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              <Ionicons name="md-rewind" size={30} />
              <Ionicons name="md-pause" size={30} />
              <Ionicons name="md-fastforward" size={30} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingBottom: 20
              }}
            >
              <Ionicons name="md-add" size={30} color="#fa95ed" />
              <Ionicons name="md-more" size={30} color="#fa95ed" />
            </View>
          </Animated.View>
        </ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
