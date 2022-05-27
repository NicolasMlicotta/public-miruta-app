import React, { useState } from "react";
import { View, StyleSheet, Button, ScrollView, Text } from "react-native";
import FeedbackItem from "../../components/FeedbackItem";

const Feedback = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <FeedbackItem />
      <FeedbackItem />
      <FeedbackItem />
      <FeedbackItem />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Feedback;
