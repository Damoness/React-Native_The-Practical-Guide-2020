import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MealDetailScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>MealDetailScreen</Text>
      <Button
        title={"go back To Top"}
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
