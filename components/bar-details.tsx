import { BarLocation } from "@/app/(tabs)"
import { Image, StyleSheet, Text, View } from "react-native"

export const BarDetails = ({ barDetails } : { barDetails: BarLocation }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: barDetails.image }} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{barDetails.title}</Text>
        <Text>{barDetails.description}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden'
  },
  title: {
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    aspectRatio: 4 / 3,
  },
  rightContainer: {
    padding: 10,
  }
})