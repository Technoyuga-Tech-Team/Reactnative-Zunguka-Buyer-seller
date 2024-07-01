import React, { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import Geocoder from "react-native-geocoding";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressContainer from "../../../components/ui/AddressContainer";
import CustomHeader from "../../../components/ui/CustomHeader";
import { GOOGLE_MAP_API_KEY } from "../../../constant";
import { Route } from "../../../constant/navigationConstants";
import { ThemeProps } from "../../../types/global.types";
import { AuthNavigationProps } from "../../../types/navigation";
import Scale from "../../../utils/Scale";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { saveAddress } from "../../../store/settings/settings.slice";

navigator.geolocation = require("react-native-geolocation-service");
const ChooseAddress: React.FC<AuthNavigationProps<Route.navChooseAddress>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const dispatch = useAppDispatch();

  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState<Point>({
    lat: 0,
    lng: 0,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 37.78825, // Initial latitude
    longitude: -122.4324, // Initial longitude
  });

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY); // Initialize geocoder with API key
  }, []);

  const onPressGetAddress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail
  ) => {
    console.log("data", JSON.stringify(data));
    console.log("details", JSON.stringify(details));
    setAddressLatLng({
      lat: Number(details?.geometry?.location?.lat),
      lng: Number(details?.geometry?.location?.lng),
    });
    const location_address =
      data.description !== undefined
        ? data.description
        : details?.formatted_address;
    setAddress(location_address);
  };

  const onPressKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  const onPressMap = (event: MapPressEvent) => {
    console.log("event", event);
  };

  const onRegionChange = (region: Region) => {
    console.log("region", region);
  };

  const handleMapPress = (event: MapPressEvent) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setMarkerCoordinate(newCoordinate);

    // Get address using geocoding library
    Geocoder.from(newCoordinate)
      .then((json) => {
        const formattedAddress = json.results[0].formatted_address;
        setAddress(formattedAddress);
      })
      .catch((error) => console.warn(error)); // Handle errors gracefully
  };

  const onPressSave = () => {
    if (address) {
      dispatch(saveAddress(address));
      navigation.goBack();
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Choose your address" />
      <View style={style.mapCont}>
        <MapView
          style={style.map}
          initialRegion={{
            latitude: 21.23263,
            longitude: 72.82079,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          onPress={handleMapPress}
        >
          <Marker
            draggable
            title="Yor are here"
            description=""
            coordinate={markerCoordinate}
          />
        </MapView>
        <View style={style.searchLocation}>
          <GooglePlacesAutocomplete
            placeholder={"Search..."}
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            nearbyPlacesAPI="GoogleReverseGeocoding"
            fetchDetails={true}
            onPress={(data, details) => {
              onPressGetAddress(data, details);
            }}
            query={{
              key: GOOGLE_MAP_API_KEY,
              language: "en",
              components: `country:us`, // default is rw
            }}
            autoFillOnNotFound={true}
            currentLocation={true}
            currentLocationLabel="Current location"
            onFail={(error) => console.log("error", error)}
            textInputProps={{
              placeholderTextColor: theme.colors?.iconColor,
            }}
            styles={{
              textInputContainer: style.googlePlaceAutoCompleteCont,
              textInput: style.textIn,
              predefinedPlacesDescription: style.predefinedPlacesDescription,
              description: { color: theme.colors?.iconColor },
            }}
          />
        </View>
      </View>
      {address && address !== "" && (
        <View style={style.addressCont}>
          <AddressContainer address={address} onPressSave={onPressSave} />
        </View>
      )}
    </View>
  );
};

export default ChooseAddress;

const useStyles = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme?.colors?.background,
    paddingTop: props.insets.top,
  },
  mapCont: {
    flex: 1,
  },
  map: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  searchLocation: {
    marginVertical: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "auto",
  },
  googlePlaceAutoCompleteCont: {
    borderRadius: Scale(5),
    height: Scale(50),
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    backgroundColor: theme.colors?.background,
  },
  textIn: {
    height: Scale(45),
    color: theme.colors?.textPrimary,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    backgroundColor: theme.colors?.background,
  },
  predefinedPlacesDescription: {
    color: theme.colors?.primary,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
  },
  addressCont: {
    position: "absolute",
    bottom: props.insets.bottom + 10,
    width: "100%",
  },
}));
