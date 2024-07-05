import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export const LevelUp = (props) => {
  const closeWindow = () => {
    props.setClosedLevelUp(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.button}>
          <Pressable onPress={closeWindow}>
            <Text>x</Text>
          </Pressable>
        </View>
        <Image
          source={require('../images/Bro.png')}
          style={styles.image}
          resizeMode="cover"
        ></Image>
        <Text style={styles.text}>You Levelled up bro!</Text>
        <Text style={styles.text}>New Items unlocked in store</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    margin: 30,
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    position: 'absolute',
    padding: 15,
    top: 0,
    right: 0,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
});
