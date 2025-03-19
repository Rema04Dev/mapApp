import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [error, setError] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setLatitude(latitude);
    setLongitude(longitude);
    Location.reverseGeocodeAsync({ latitude, longitude });
  }

  useEffect(() => {
    getUserLocation();
  }, []);

  return { error, longitude, latitude };
}