import React, { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import Geocoder from "react-native-geocoding";
import Geolocation from "react-native-geolocation-service";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  Point,
} from "react-native-google-places-autocomplete";
import MapView, {
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PoiClickEvent,
} from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddressContainer from "../../../components/ui/AddressContainer";
import CustomHeader from "../../../components/ui/CustomHeader";
import Loading from "../../../components/ui/Loading";
import SearchIcon from "../../../components/ui/svg/SearchIcon";
import { GOOGLE_MAP_API_KEY } from "../../../constant";
import { Route } from "../../../constant/navigationConstants";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setErrors } from "../../../store/global/global.slice";
import {
  saveAddress,
  saveCity,
  saveLatLng,
} from "../../../store/settings/settings.slice";
import { ThemeProps } from "../../../types/global.types";
import { AuthNavigationProps } from "../../../types/navigation";
import Scale from "../../../utils/Scale";

// @ts-ignore
navigator.geolocation = require("react-native-geolocation-service");
const ChooseAddress: React.FC<AuthNavigationProps<Route.navChooseAddress>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const style = useStyles({ insets });
  const { theme } = useTheme();

  const mapRef = useRef<MapView>(null);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [addressLatLng, setAddressLatLng] = useState<Point>({
    lat: 0,
    lng: 0,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  const [initialCoordinate, setInitialCoordinate] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  useEffect(() => {
    Geocoder.init(GOOGLE_MAP_API_KEY); // Initialize geocoder with API key
  }, []);

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
  function getAddressFromCoords(lat: number, lng: number) {
    const apiKey = GOOGLE_MAP_API_KEY; // Replace with your Google Maps API key
    const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    fetch(geocodeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const address = data.results[0].formatted_address;
          console.log("Address: ", address);
          setAddress(address);
        } else {
          console.error("No address found");
        }
      })
      .catch((error) => {
        console.error("Error with geocoding: ", error);
      });
  }

  const getOneTimeLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log("position - - ", position);
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
        setAddressLatLng({
          lat: Number(currentLatitude),
          lng: Number(currentLongitude),
        });
        getAddressFromCoords(currentLatitude, currentLongitude);
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

  const onPressGetAddress = (
    data: GooglePlaceData,
    details: GooglePlaceDetail
  ) => {
    dispatch(saveCity(""));
    if (data) {
      // @ts-ignore
      const addressComponents = data?.address_components;
      // Loop through address components to find the city
      if (addressComponents && addressComponents.length > 0) {
        for (const component of addressComponents) {
          if (component.types.includes("locality")) {
            const city = component.long_name;
            console.log("Extracted City:", city);
            setCity(city);
          }
        }
      }
    }
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

  const handleMapPress = (event: MapPressEvent) => {
    try {
      event.stopPropagation();
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
    } catch (error) {
      console.log("catch handleMapPress", error);
    }
  };

  const onDrag = (event: MarkerDragStartEndEvent) => {
    try {
      event.stopPropagation();
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
    } catch (error) {
      console.log("catch onDrag", error);
    }
  };

  const onPoiPress = (event: PoiClickEvent) => {
    try {
      event.stopPropagation();
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
    } catch (error) {
      console.log("catch onPoiPress", error);
    }
  };

  const onPressSave = () => {
    if (address) {
      dispatch(saveAddress(address));
      dispatch(saveLatLng({ lat: addressLatLng.lat, lng: addressLatLng.lng }));
      dispatch(saveCity(city));
      navigation.goBack();
    }
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Search or drop the pin" />
      <View style={style.mapCont}>
        {loading && <Loading />}
        {!loading &&
        initialCoordinate?.latitude !== 0 &&
        initialCoordinate.longitude !== 0 ? (
          <MapView
            ref={mapRef}
            style={style.map}
            pointerEvents="box-none"
            initialRegion={{
              latitude: initialCoordinate?.latitude,
              longitude: initialCoordinate.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.04,
            }}
            onMarkerDragEnd={onDrag}
            onPress={handleMapPress}
            onPoiClick={onPoiPress}
          >
            <Marker
              draggable
              title={address ? address : "You are here"}
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
              // @ts-ignore
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
