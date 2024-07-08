import React, { useState } from "react";
import { View, Text } from "react-native";
import { UserSetup } from "../components/UserSetup";
import {AccountSettings} from '../components/AccountSettings'
import {
  StyleSheet,
  Pressable
} from 'react-native';



export const SettingsScreen = ({navigation, userId}) => {

    const  [accountSettingsView, setAccountSettingsView] = useState(true)

    const accountClick = () => {
      setAccountSettingsView(true)
    }
    const profileClick = () => {
      setAccountSettingsView(false)
    }

  return (
    <View style={styles.container}>
      <View style={styles.fixToText}>
        <Pressable onPress={accountClick}
          style={[styles.button, accountSettingsView? styles.activeButton: styles.inactiveButton]}>
          <Text>account settings</Text>
        </Pressable>
        <Pressable onPress={profileClick}
          style={[styles.button, accountSettingsView? styles.inactiveButton: styles.activeButton]}>
          <Text>profile settings</Text>
        </Pressable>
      </View>
      <Separator />
      {accountSettingsView? <AccountSettings navigation={navigation} userId={userId}/> : <UserSetup />}
    </View>
  );
};

export const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: 'red'
  }, 
  inactiveButton: {
    backgroundColor: 'blue'
  }

});