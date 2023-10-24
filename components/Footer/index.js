import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text style={styles.text}>© {currentDate} RN School Software.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    backgroundColor: "#f1f1f1",
  },
  footerContent: {
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
});

export default Footer;
