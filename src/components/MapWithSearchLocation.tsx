import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryCode } from "react-native-country-picker-modal";
import { makeStyles, useTheme } from "react-native-elements";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  Point,
} from "react-native-google-places-autocomplete";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeProps } from "../types/global.types";
import Scale from "../utils/Scale";
import BackIcon from "./ui/svg/BackIcon";
import { GOOGLE_MAP_API_KEY } from "../constant";
import Geolocation from "react-native-geolocation-service";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setErrors } from "../store/global/global.slice";
import AddressContainer from "./ui/AddressContainer";
import Loading from "./ui/Loading";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import SearchIcon from "./ui/svg/SearchIcon";
import Geocoder from "react-native-geocoding";

// @ts-ignore
navigator.geolocation = require("react-native-geolocation-service");
interface MapWithSearchLocationProps {
  visiblePopup: boolean;
  togglePopup: () => void;
  onPressSetAddress: (address: string, latlng: any) => void;
  countryCode: CountryCode;
}

const MapWithSearchLocation: React.FC<MapWithSearchLocationProps> = ({
  visiblePopup,
  togglePopup,
  onPressSetAddress,
  countryCode,
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const style = useStyle({ insets });

  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView>(null);

  const textinRef = React.useRef<GooglePlacesAutocompleteRef>(null);

  const [focuseKeyboard, setFocuseKeyboard] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState<Point>({
    lat: 0,
    lng: 0,
  });

  const [initialCoordinate, setInitialCoordinate] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "ios") {
        await Geolocation.requestAuthorization("whenInUse");
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
              buttonPositive: "ok",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            dispatch(
              setErrors({
                message: "Location permission Denied",
                status: 0,
                statusCode: null,
              })
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      // Geolocation.clearWatch();
    };
  }, []);

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY); // Initialize geocoder with API key
  }, []);

  const getOneTimeLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;
        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        setInitialCoordinate({
          latitude: currentLatitude,
          longitude: currentLongitude,
        });
        setMarkerCoordinate({
          latitude: currentLatitude,
          longitude: currentLongitude,
        });
        mapRef.current?.fitToCoordinates(
          [
            {
              latitude: currentLatitude,
              longitude: currentLongitude,
            },
          ],
          { animated: true }
        );
        setLoading(false);
      },
      (error) => {
        setLoading(false);

        dispatch(
          setErrors({
            message: error.message,
            status: 0,
            statusCode: null,
          })
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      }
    );
  };

  useEffect(() => {
    textinRef.current?.focus();
    setFocuseKeyboard(true);
  }, []);

  const country_ = countryCode.toLocaleLowerCase() ?? "rw";

  const handleMapPress = (event: MapPressEvent) => {
    const newCoordinate = event.nativeEvent.coordinate;
    setMarkerCoordinate(newCoordinate);
    setAddressLatLng({
      lat: Number(newCoordinate.latitude),
      lng: Number(newCoordinate.longitude),
    });
    // Get address using geocoding library
    Geocoder.from(newCoordinate)
      .then((json) => {
        const formattedAddress = json.results[0].formatted_address;
        setAddress(formattedAddress);
      })
      .catch((error) => console.warn(error)); // Handle errors gracefully
  };

  const onPressGetAddress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail
  ) => {
    console.log("data", JSON.stringify(data));
    console.log("details", JSON.stringify(details));
    setMarkerCoordinate({
      latitude: details?.geometry?.location?.lat,
      longitude: details?.geometry?.location?.lng,
    });
    mapRef.current?.fitToCoordinates(
      [
        {
          latitude: details?.geometry?.location?.lat,
          longitude: details?.geometry?.location?.lng,
        },
      ],
      { animated: true }
    );
    setAddressLatLng({
      lat: Number(details?.geometry?.location?.lat),
      lng: Number(details?.geometry?.location?.lng),
    });
    const location_address =
      data.description !== undefined
        ? data.description
        : // @ts-ignore
        data?.formatted_address // data?.formatted_address is getting address when fetch address using current location
        ? // @ts-ignore
          data?.formatted_address
        : details?.formatted_address;
    setAddress(location_address);
  };

  const onPressSave = () => {
    if (address) {
      let latlng = { lat: addressLatLng.lat, lng: addressLatLng.lng };
      onPressSetAddress(address, latlng);
      //   dispatch(saveAddress(address));
      //   dispatch(saveLatLng({ lat: addressLatLng.lat, lng: addressLatLng.lng }));
      //   dispatch(saveCity(city));
      //   navigation.goBack();
    }
  };

  return (
    <Modal
      visible={visiblePopup}
      onRequestClose={togglePopup}
      onDismiss={togglePopup}
      style={style.modalCont}
      animationType="slide"
    >
      <View style={style.container}>
        <View>
          <TouchableOpacity onPress={togglePopup} style={style.backButtonCont}>
            <BackIcon color={theme.colors?.black} />
          </TouchableOpacity>
          <Text style={style.txtTitle}>Location</Text>
        </View>

        <View style={style.mapCont}>
          {loading && <Loading />}
          {!loading &&
          initialCoordinate?.latitude !== 0 &&
          initialCoordinate.longitude !== 0 ? (
            <MapView
              ref={mapRef}
              style={style.map}
              initialRegion={{
                latitude: initialCoordinate?.latitude,
                longitude: initialCoordinate.longitude,
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
          ) : null}
          <View style={style.searchLocation}>
            <GooglePlacesAutocomplete
              placeholder={"Search..."}
              GooglePlacesDetailsQuery={{ fields: "geometry" }}
              nearbyPlacesAPI="GoogleReverseGeocoding"
              fetchDetails={true}
              renderLeftButton={() => (
                <SearchIcon
                  color={theme?.colors?.primary}
                  style={{ marginHorizontal: 10 }}
                />
              )}
              onPress={(data, details) => {
                onPressGetAddress(data, details);
              }}
              query={{
                key: GOOGLE_MAP_API_KEY,
                language: "en",
                // components: `country:rw`, // default is rw
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
    </Modal>
  );
};

export default MapWithSearchLocation;

const useStyle = makeStyles((theme, props: ThemeProps) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors?.white,
    // paddingTop: props.insets.top,
    // paddingRight: 10,
    // paddingLeft: 10,
  },
  modalCont: {
    backgroundColor: theme.colors?.white,
  },
  googlePlaceAutoCompleteCont: {
    borderRadius: Scale(8),
    height: Scale(50),
    paddingLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 4,
    backgroundColor: theme.colors?.white,
    borderColor: theme?.colors?.border,
    borderWidth: 1,
  },
  textIn: {
    height: Scale(45),
    color: theme.colors?.textPrimary,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
    backgroundColor: theme.colors?.transparent,
  },
  predefinedPlacesDescription: {
    color: theme.colors?.primary,
    fontSize: theme.fontSize?.fs16,
    fontFamily: theme.fontFamily?.regular,
  },
  backButtonCont: {
    height: Scale(50),
    width: Scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
  txtTitle: {
    fontSize: theme.fontSize?.fs20,
    fontFamily: theme.fontFamily?.regular,
    color: theme.colors?.primary,
    position: "absolute",
    alignSelf: "center",
    bottom: Scale(12),
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
  addressCont: {
    position: "absolute",
    bottom: props.insets.bottom + 10,
    width: "100%",
    alignSelf: "center",
  },
}));
