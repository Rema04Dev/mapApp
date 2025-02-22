import { BarLocation } from "@/app/(tabs)";
import { Text, View } from "react-native";
import { Callout, Marker } from 'react-native-maps';

export const CustomMarker = ({ barLocation, onPress }: { barLocation: BarLocation, onPress: () => void }) => {
  return (
    <Marker
      onPress={onPress}
      key={barLocation.id}
      coordinate={{ latitude: barLocation.latitude, longitude: barLocation.longitude }}
    >
      {/* <View style={{
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        minWidth: 80, // Минимальная ширина, чтобы текст не сжимался
        alignItems: 'center' // Центрируем текст
      }}>
        <Text style={{ flexWrap: 'wrap', textAlign: 'center' }}>
          {barLocation.title}
        </Text>
      </View> */}
    </Marker>
  )
}