import { Button, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useMemo, useRef, useState } from 'react';
import { CustomMarker } from '@/components/marker';
import { BarDetails } from '@/components/bar-details';
import BottomSheet, { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useLocation } from '@/hooks/useLocation';

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

export type BarLocation = {
  id: string;
  latitude: number,
  longitude: number;
  title: string;
  description: string;
  image: string;
  features: string[];
};

const getRandomOffset = () => (Math.random() - 0.5) * 0.1;

export const BARS = Array.from({ length: 20 }, (_, index) => ({
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
  const [selectedBars, setSelectedBar] = useState<null | BarLocation[]>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const [mode, setMode] = useState<'map' | 'list'>('map');

  const toggleMode = () => {
    setMode((prev) => (prev === 'map' ? 'list' : 'map'));
  };
  if (mode === 'list') {
    return (
      <ThemedView style={{ flex: 1 }}>
        <FlatList
          data={BARS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 10, padding: 10 }}
          renderItem={({ item }) => (
            <BarDetails barDetails={item} />
          )}
        />
        <View style={{ position: 'absolute', right: 20, bottom: 20, flex: 1, width: 100 }}>
          <TouchableOpacity onPress={toggleMode} style={{borderColor: 'black', borderWidth: 3,  backgroundColor: 'white', paddingHorizontal: 5, paddingVertical: 8, borderRadius: 20 }}>
            <Text style={{ textAlign: 'center' }}>{mode === 'map' ? 'Список' : 'Карта'}</Text>
          </TouchableOpacity>
          {/* <Button title='map' color={'red'} onPress={toggleMode} /> */}
        </View>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={{ flex: 1, position: 'relative' }}>
      <MapView style={StyleSheet.absoluteFill}
        initialRegion={INITIAL_REGION}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        // showsMyLocationButton
        ref={mapRef}
      >
        {BARS.map((location) => (
          <CustomMarker barLocation={location} key={location.id} onPress={() => setSelectedBar([location])} />
        ))}
      </MapView>
      <View style={{ position: 'absolute', right: 20, bottom: 20, flex: 1, width: 100 }}>
        <TouchableOpacity onPress={toggleMode} style={{ borderColor: 'black', borderWidth: 3, backgroundColor: 'white', paddingHorizontal: 5, paddingVertical: 8, borderRadius: 20 }}>
          <Text style={{ textAlign: 'center' }}>{mode === 'map' ? 'Список' : 'Карта'}</Text>
        </TouchableOpacity>
        {/* <Button title='map' color={'red'} onPress={toggleMode} /> */}
      </View>
      {
        selectedBars && (
          <BottomSheet
            // ref={bottomSheetRef}
            // onChange={handleSheetChanges}
            enablePanDownToClose
            snapPoints={snapPoints}
            index={0}
          >
            <BottomSheetView style={{ flex: 1 }}>
              <BottomSheetFlatList
                data={selectedBars}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => (
                  <BarDetails barDetails={item} />
                )} />
            </BottomSheetView>
          </BottomSheet>
        )
      }
    </ThemedView>
  );
}
