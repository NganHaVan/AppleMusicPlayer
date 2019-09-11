/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// TODO: Tell the diff between xcode project and xcode workspace

import React, { useState } from "react";
import { View } from "react-native";
import AppleMusicPlayer from "./components/AppleMusicPlayer";

const App = () => {
  return (
    <View>
      <AppleMusicPlayer />
    </View>
  );
};

export default App;
