import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useMemo, useRef, useState } from 'react';
import { CustomMarker } from '@/components/marker';
import { BarDetails } from '@/components/bar-details';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const FEATURES = [
  'Живая музыка',
  'Спортивные трансляции',
  'Караоке',
  'Детская зона',
  'Игровые автоматы',
  'Танцпол',
  'Настольные игры',
  'Кальян',
];

const getRandomFeatures = () => {
  const count = Math.floor(Math.random() * 4) + 2; // от 2 до 5 фич
  return [...new Set(Array.from({ length: count }, () => FEATURES[Math.floor(Math.random() * FEATURES.length)]))];
};

const getRandomOffset = () => (Math.random() - 0.5) * 0.1;

export type BarLocation = {
  id: string;
  latitude: number,
  longitude: number;
  title: string;
  description: string;
  image: string;
  features: string[];
};

export const LOCATIONS = Array.from({ length: 20 }, (_, index) => ({
  id: (index + 1).toString(),
  latitude: 42.9000 + index * 0.002 + getRandomOffset(),
  longitude: 71.2667 + (index % 10) * 0.002 + getRandomOffset(),
  title: `Место ${index + 1}`,
  description: `Описание для места ${index + 1}`,
  image: `https://images.pexels.com/photos/1269025/pexels-photo-1269025.jpeg`, // случайные фото
  features: getRandomFeatures(),
}));

const INITIAL_REGION = {
  latitude: 42.9000, // Широта Тараза
  longitude: 71.3667, // Долгота Тараза
  latitudeDelta: 1, // Уменьшил масштаб для лучшего отображения
  longitudeDelta: 1,
};

export default function HomeScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [selectedBar, setSelectedBar] = useState<null | BarLocation>(null);

  const snapPoints = useMemo(() => [50, '25%', '50%', '90%'], []);
  return (
    <ThemedView style={{ flex: 1 }}>
      <MapView style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation
        // showsMyLocationButton
        ref={mapRef}
      >
        {LOCATIONS.map((location) => (
          <CustomMarker barLocation={location} key={location.id} onPress={() => setSelectedBar(location)} />
        ))}

      </MapView>
      {/* {
        selectedBar && (
          <View style={{ position: 'absolute', bottom: 50, left: 10, right: 10 }}>
            <BarDetails barDetails={selectedBar} />
          </View>
        )
      } */}
      <BottomSheet
        // ref={bottomSheetRef}
        // onChange={handleSheetChanges}
        // enablePanDownToClose
        snapPoints={snapPoints}
        index={0}
      >
        <BottomSheetView style={{ flex: 1 }}>
          <Text>{LOCATIONS.length} bars here</Text>
          <FlatList data={LOCATIONS} contentContainerStyle={{ gap: 10, padding: 10 }} renderItem={({ item }) => (<BarDetails barDetails={item} key={item.id} />)} />
          {/* <Text>Awesome 🎉</Text> */}
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}
