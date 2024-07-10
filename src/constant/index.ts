import { Dimensions } from "react-native";
import DeviceInfo from "react-native-device-info";
import { SliderItemProps } from "../types/slider.types";

const { width, height } = Dimensions.get("window");

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;
export const LARGE_BTN = width - 50;
export const SMALL_BTN = width / 2;

export const ASPECT_RATIO = width / 360;

export const HAS_NOTCH = DeviceInfo.hasNotch();

export const HIT_SLOP = { top: 10, bottom: 10, right: 10, left: 10 };
export const HIT_SLOP2 = { top: 20, bottom: 20, right: 20, left: 20 };

export const userType = "buyer_seller";
export const User_Role_Buyer_Seller = "buyer_seller";
export const User_Role_Mover = "mover";

/* when you sent a build please set to US*/
export const CURRENT_COUNTRY_CODE = "US";

// Google map key
export const GOOGLE_MAP_API_KEY = "AIzaSyCVccOgy8-HJMjKuUCNC6B1_4z2WOoyRK4";

// Google web client id
export const GOOGLE_WEB_CLIENT_ID =
  "784015034349-k2l1hu4gt38f1qdmcefo0rtlc0kl9ih1.apps.googleusercontent.com";

// BASE_URL // http://3.70.108.140/api/
export const BASE_PORT = "3.70.108.140";
export const SOCKET_PORT = `${BASE_PORT}:4000`;
export const BASE_URL = `http://${BASE_PORT}/api`;
export const SOCKET_URL = `http://${SOCKET_PORT}`;

export const USER_DATA = "@user_data";
export const USER_ROLE = "@user_role";

export const MAX_CHAR_LENGTH = 35;

export const ENABLE_PUSH_NOTIFICATION = "@enable_push_notification";
export const NEW_MESSAGE_NOTIFICATION = "@new_message";
export const NEW_ITEMS_NOTIFICATION = "@new_items";
export const PURCHASE_ITEMS_NOTIFICATION = "@purchase_items";

export const DUMMY_PLACEHOLDER = require("../assets/images/placeholder.jpg");

export const DUMMY_USER =
  "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D";

export const secureStoreKeys = {
  JWT_TOKEN: "jwt_token",
  AUTH_TOKEN: "auth_token",
};

export const options = {
  quality: 0.6,
  maxWidth: 500,
  maxHeight: 500,
  storageOptions: {
    cameraRoll: true,
    waitUntilSaved: true,
  },
};

export const USA_STATE = [
  {
    title: "Alabama",
    key: "AL",
  },
  {
    title: "Alaska",
    key: "AK",
  },
  {
    title: "American Samoa",
    key: "AS",
  },
  {
    title: "Arizona",
    key: "AZ",
  },
  {
    title: "Arkansas",
    key: "AR",
  },
  {
    title: "California",
    key: "CA",
  },
  {
    title: "Colorado",
    key: "CO",
  },
  {
    title: "Connecticut",
    key: "CT",
  },
  {
    title: "Delaware",
    key: "DE",
  },
  {
    title: "District Of Columbia",
    key: "DC",
  },
  {
    title: "Federated States Of Micronesia",
    key: "FM",
  },
  {
    title: "Florida",
    key: "FL",
  },
  {
    title: "Georgia",
    key: "GA",
  },
  {
    title: "Guam",
    key: "GU",
  },
  {
    title: "Hawaii",
    key: "HI",
  },
  {
    title: "Idaho",
    key: "ID",
  },
  {
    title: "Illinois",
    key: "IL",
  },
  {
    title: "Indiana",
    key: "IN",
  },
  {
    title: "Iowa",
    key: "IA",
  },
  {
    title: "Kansas",
    key: "KS",
  },
  {
    title: "Kentucky",
    key: "KY",
  },
  {
    title: "Louisiana",
    key: "LA",
  },
  {
    title: "Maine",
    key: "ME",
  },
  {
    title: "Marshall Islands",
    key: "MH",
  },
  {
    title: "Maryland",
    key: "MD",
  },
  {
    title: "Massachusetts",
    key: "MA",
  },
  {
    title: "Michigan",
    key: "MI",
  },
  {
    title: "Minnesota",
    key: "MN",
  },
  {
    title: "Mississippi",
    key: "MS",
  },
  {
    title: "Missouri",
    key: "MO",
  },
  {
    title: "Montana",
    key: "MT",
  },
  {
    title: "Nebraska",
    key: "NE",
  },
  {
    title: "Nevada",
    key: "NV",
  },
  {
    title: "New Hampshire",
    key: "NH",
  },
  {
    title: "New Jersey",
    key: "NJ",
  },
  {
    title: "New Mexico",
    key: "NM",
  },
  {
    title: "New York",
    key: "NY",
  },
  {
    title: "North Carolina",
    key: "NC",
  },
  {
    title: "North Dakota",
    key: "ND",
  },
  {
    title: "Northern Mariana Islands",
    key: "MP",
  },
  {
    title: "Ohio",
    key: "OH",
  },
  {
    title: "Oklahoma",
    key: "OK",
  },
  {
    title: "Oregon",
    key: "OR",
  },
  {
    title: "Palau",
    key: "PW",
  },
  {
    title: "Pennsylvania",
    key: "PA",
  },
  {
    title: "Puerto Rico",
    key: "PR",
  },
  {
    title: "Rhode Island",
    key: "RI",
  },
  {
    title: "South Carolina",
    key: "SC",
  },
  {
    title: "South Dakota",
    key: "SD",
  },
  {
    title: "Tennessee",
    key: "TN",
  },
  {
    title: "Texas",
    key: "TX",
  },
  {
    title: "Utah",
    key: "UT",
  },
  {
    title: "Vermont",
    key: "VT",
  },
  {
    title: "Virgin Islands",
    key: "VI",
  },
  {
    title: "Virginia",
    key: "VA",
  },
  {
    title: "Washington",
    key: "WA",
  },
  {
    title: "West Virginia",
    key: "WV",
  },
  {
    title: "Wisconsin",
    key: "WI",
  },
  {
    title: "Wyoming",
    key: "WY",
  },
];

const renderCity = (city: string) => {
  return { key: city.toLowerCase().replace("", "_"), title: city };
};

export const USA_STATES_CITY: any = {
  New_York: [
    "New York",
    "Buffalo",
    "Rochester",
    "Yonkers",
    "Syracuse",
    "Albany",
    "New Rochelle",
    "Mount Vernon",
    "Schenectady",
    "Utica",
    "White Plains",
    "Hempstead",
    "Troy",
    "Niagara Falls",
    "Binghamton",
    "Freeport",
    "Valley Stream",
  ].map(renderCity),
  California: [
    "Los Angeles",
    "San Diego",
    "San Jose",
    "San Francisco",
    "Fresno",
    "Sacramento",
    "Long Beach",
    "Oakland",
    "Bakersfield",
    "Anaheim",
    "Santa Ana",
    "Riverside",
    "Stockton",
    "Chula Vista",
    "Irvine",
    "Fremont",
    "San Bernardino",
    "Modesto",
    "Fontana",
    "Oxnard",
    "Moreno Valley",
    "Huntington Beach",
    "Glendale",
    "Santa Clarita",
    "Garden Grove",
    "Oceanside",
    "Rancho Cucamonga",
    "Santa Rosa",
    "Ontario",
    "Lancaster",
    "Elk Grove",
    "Corona",
    "Palmdale",
    "Salinas",
    "Pomona",
    "Hayward",
    "Escondido",
    "Torrance",
    "Sunnyvale",
    "Orange",
    "Fullerton",
    "Pasadena",
    "Thousand Oaks",
    "Visalia",
    "Simi Valley",
    "Concord",
    "Roseville",
    "Victorville",
    "Santa Clara",
    "Vallejo",
    "Berkeley",
    "El Monte",
    "Downey",
    "Costa Mesa",
    "Inglewood",
    "Carlsbad",
    "San Buenaventura (Ventura)",
    "Fairfield",
    "West Covina",
    "Murrieta",
    "Richmond",
    "Norwalk",
    "Antioch",
    "Temecula",
    "Burbank",
    "Daly City",
    "Rialto",
    "Santa Maria",
    "El Cajon",
    "San Mateo",
    "Clovis",
    "Compton",
    "Jurupa Valley",
    "Vista",
    "South Gate",
    "Mission Viejo",
    "Vacaville",
    "Carson",
    "Hesperia",
    "Santa Monica",
    "Westminster",
    "Redding",
    "Santa Barbara",
    "Chico",
    "Newport Beach",
    "San Leandro",
    "San Marcos",
    "Whittier",
    "Hawthorne",
    "Citrus Heights",
    "Tracy",
    "Alhambra",
    "Livermore",
    "Buena Park",
    "Menifee",
    "Hemet",
    "Lakewood",
    "Merced",
    "Chino",
    "Indio",
    "Redwood City",
    "Lake Forest",
    "Napa",
    "Tustin",
    "Bellflower",
    "Mountain View",
    "Chino Hills",
    "Baldwin Park",
    "Alameda",
    "Upland",
    "San Ramon",
    "Folsom",
    "Pleasanton",
    "Union City",
    "Perris",
    "Manteca",
    "Lynwood",
    "Apple Valley",
    "Redlands",
    "Turlock",
    "Milpitas",
    "Redondo Beach",
    "Rancho Cordova",
    "Yorba Linda",
    "Palo Alto",
    "Davis",
    "Camarillo",
    "Walnut Creek",
    "Pittsburg",
    "South San Francisco",
    "Yuba City",
    "San Clemente",
    "Laguna Niguel",
    "Pico Rivera",
    "Montebello",
    "Lodi",
    "Madera",
    "Santa Cruz",
    "La Habra",
    "Encinitas",
    "Monterey Park",
    "Tulare",
    "Cupertino",
    "Gardena",
    "National City",
    "Rocklin",
    "Petaluma",
    "Huntington Park",
    "San Rafael",
    "La Mesa",
    "Arcadia",
    "Fountain Valley",
    "Diamond Bar",
    "Woodland",
    "Santee",
    "Lake Elsinore",
    "Porterville",
    "Paramount",
    "Eastvale",
    "Rosemead",
    "Hanford",
    "Highland",
    "Brentwood",
    "Novato",
    "Colton",
    "Cathedral City",
    "Delano",
    "Yucaipa",
    "Watsonville",
    "Placentia",
    "Glendora",
    "Gilroy",
    "Palm Desert",
    "Cerritos",
    "West Sacramento",
    "Aliso Viejo",
    "Poway",
    "La Mirada",
    "Rancho Santa Margarita",
    "Cypress",
    "Dublin",
    "Covina",
    "Azusa",
    "Palm Springs",
    "San Luis Obispo",
    "Ceres",
    "San Jacinto",
    "Lincoln",
    "Newark",
    "Lompoc",
    "El Centro",
    "Danville",
    "Bell Gardens",
    "Coachella",
    "Rancho Palos Verdes",
    "San Bruno",
    "Rohnert Park",
    "Brea",
    "La Puente",
    "Campbell",
    "San Gabriel",
    "Beaumont",
    "Morgan Hill",
    "Culver City",
    "Calexico",
    "Stanton",
    "La Quinta",
    "Pacifica",
    "Montclair",
    "Oakley",
    "Monrovia",
    "Los Banos",
    "Martinez",
  ].map(renderCity),
  Illinois: [
    "Chicago",
    "Aurora",
    "Rockford",
    "Joliet",
    "Naperville",
    "Springfield",
    "Peoria",
    "Elgin",
    "Waukegan",
    "Cicero",
    "Champaign",
    "Bloomington",
    "Arlington Heights",
    "Evanston",
    "Decatur",
    "Schaumburg",
    "Bolingbrook",
    "Palatine",
    "Skokie",
    "Des Plaines",
    "Orland Park",
    "Tinley Park",
    "Oak Lawn",
    "Berwyn",
    "Mount Prospect",
    "Normal",
    "Wheaton",
    "Hoffman Estates",
    "Oak Park",
    "Downers Grove",
    "Elmhurst",
    "Glenview",
    "DeKalb",
    "Lombard",
    "Belleville",
    "Moline",
    "Buffalo Grove",
    "Bartlett",
    "Urbana",
    "Quincy",
    "Crystal Lake",
    "Plainfield",
    "Streamwood",
    "Carol Stream",
    "Romeoville",
    "Rock Island",
    "Hanover Park",
    "Carpentersville",
    "Wheeling",
    "Park Ridge",
    "Addison",
    "Calumet City",
  ].map(renderCity),
  Texas: [
    "Houston",
    "San Antonio",
    "Dallas",
    "Austin",
    "Fort Worth",
    "El Paso",
    "Arlington",
    "Corpus Christi",
    "Plano",
    "Laredo",
    "Lubbock",
    "Garland",
    "Irving",
    "Amarillo",
    "Grand Prairie",
    "Brownsville",
    "Pasadena",
    "McKinney",
    "Mesquite",
    "McAllen",
    "Killeen",
    "Frisco",
    "Waco",
    "Carrollton",
    "Denton",
    "Midland",
    "Abilene",
    "Beaumont",
    "Round Rock",
    "Odessa",
    "Wichita Falls",
    "Richardson",
    "Lewisville",
    "Tyler",
    "College Station",
    "Pearland",
    "San Angelo",
    "Allen",
    "League City",
    "Sugar Land",
    "Longview",
    "Edinburg",
    "Mission",
    "Bryan",
    "Baytown",
    "Pharr",
    "Temple",
    "Missouri City",
    "Flower Mound",
    "Harlingen",
    "North Richland Hills",
    "Victoria",
    "Conroe",
    "New Braunfels",
    "Mansfield",
    "Cedar Park",
    "Rowlett",
    "Port Arthur",
    "Euless",
    "Georgetown",
    "Pflugerville",
    "DeSoto",
    "San Marcos",
    "Grapevine",
    "Bedford",
    "Galveston",
    "Cedar Hill",
    "Texas City",
    "Wylie",
    "Haltom City",
    "Keller",
    "Coppell",
    "Rockwall",
    "Huntsville",
    "Duncanville",
    "Sherman",
    "The Colony",
    "Burleson",
    "Hurst",
    "Lancaster",
    "Texarkana",
    "Friendswood",
    "Weslaco",
  ].map(renderCity),
  Pennsylvania: [
    "Philadelphia",
    "Pittsburgh",
    "Allentown",
    "Erie",
    "Reading",
    "Scranton",
    "Bethlehem",
    "Lancaster",
    "Harrisburg",
    "Altoona",
    "York",
    "State College",
    "Wilkes-Barre",
  ].map(renderCity),
  Arizona: [
    "Phoenix",
    "Tucson",
    "Mesa",
    "Chandler",
    "Glendale",
    "Scottsdale",
    "Gilbert",
    "Tempe",
    "Peoria",
    "Surprise",
    "Yuma",
    "Avondale",
    "Goodyear",
    "Flagstaff",
    "Buckeye",
    "Lake Havasu City",
    "Casa Grande",
    "Sierra Vista",
    "Maricopa",
    "Oro Valley",
    "Prescott",
    "Bullhead City",
    "Prescott Valley",
    "Marana",
    "Apache Junction",
  ].map(renderCity),
  Florida: [
    "Jacksonville",
    "Miami",
    "Tampa",
    "Orlando",
    "St. Petersburg",
    "Hialeah",
    "Tallahassee",
    "Fort Lauderdale",
    "Port St. Lucie",
    "Cape Coral",
    "Pembroke Pines",
    "Hollywood",
    "Miramar",
    "Gainesville",
    "Coral Springs",
    "Miami Gardens",
    "Clearwater",
    "Palm Bay",
    "Pompano Beach",
    "West Palm Beach",
    "Lakeland",
    "Davie",
    "Miami Beach",
    "Sunrise",
    "Plantation",
    "Boca Raton",
    "Deltona",
    "Largo",
    "Deerfield Beach",
    "Palm Coast",
    "Melbourne",
    "Boynton Beach",
    "Lauderhill",
    "Weston",
    "Fort Myers",
    "Kissimmee",
    "Homestead",
    "Tamarac",
    "Delray Beach",
    "Daytona Beach",
    "North Miami",
    "Wellington",
    "North Port",
    "Jupiter",
    "Ocala",
    "Port Orange",
    "Margate",
    "Coconut Creek",
    "Sanford",
    "Sarasota",
    "Pensacola",
    "Bradenton",
    "Palm Beach Gardens",
    "Pinellas Park",
    "Coral Gables",
    "Doral",
    "Bonita Springs",
    "Apopka",
    "Titusville",
    "North Miami Beach",
    "Oakland Park",
    "Fort Pierce",
    "North Lauderdale",
    "Cutler Bay",
    "Altamonte Springs",
    "St. Cloud",
    "Greenacres",
    "Ormond Beach",
    "Ocoee",
    "Hallandale Beach",
    "Winter Garden",
    "Aventura",
  ].map(renderCity),
  Indiana: [
    "Indianapolis",
    "Fort Wayne",
    "Evansville",
    "South Bend",
    "Carmel",
    "Bloomington",
    "Fishers",
    "Hammond",
    "Gary",
    "Muncie",
    "Lafayette",
    "Terre Haute",
    "Kokomo",
    "Anderson",
    "Noblesville",
    "Greenwood",
    "Elkhart",
    "Mishawaka",
    "Lawrence",
    "Jeffersonville",
    "Columbus",
    "Portage",
  ].map(renderCity),
  Ohio: [
    "Columbus",
    "Cleveland",
    "Cincinnati",
    "Toledo",
    "Akron",
    "Dayton",
    "Parma",
    "Canton",
    "Youngstown",
    "Lorain",
    "Hamilton",
    "Springfield",
    "Kettering",
    "Elyria",
    "Lakewood",
    "Cuyahoga Falls",
    "Middletown",
    "Euclid",
    "Newark",
    "Mansfield",
    "Mentor",
    "Beavercreek",
    "Cleveland Heights",
    "Strongsville",
    "Dublin",
    "Fairfield",
    "Findlay",
    "Warren",
    "Lancaster",
    "Lima",
    "Huber Heights",
    "Westerville",
    "Marion",
    "Grove City",
  ].map(renderCity),
  North_Carolina: [
    "Charlotte",
    "Raleigh",
    "Greensboro",
    "Durham",
    "Winston-Salem",
    "Fayetteville",
    "Cary",
    "Wilmington",
    "High Point",
    "Greenville",
    "Asheville",
    "Concord",
    "Gastonia",
    "Jacksonville",
    "Chapel Hill",
    "Rocky Mount",
    "Burlington",
    "Wilson",
    "Huntersville",
    "Kannapolis",
    "Apex",
    "Hickory",
    "Goldsboro",
  ].map(renderCity),
  Michigan: [
    "Detroit",
    "Grand Rapids",
    "Warren",
    "Sterling Heights",
    "Ann Arbor",
    "Lansing",
    "Flint",
    "Dearborn",
    "Livonia",
    "Westland",
    "Troy",
    "Farmington Hills",
    "Kalamazoo",
    "Wyoming",
    "Southfield",
    "Rochester Hills",
    "Taylor",
    "Pontiac",
    "St. Clair Shores",
    "Royal Oak",
    "Novi",
    "Dearborn Heights",
    "Battle Creek",
    "Saginaw",
    "Kentwood",
    "East Lansing",
    "Roseville",
    "Portage",
    "Midland",
    "Lincoln Park",
    "Muskegon",
  ].map(renderCity),
  Tennessee: [
    "Memphis",
    "Nashville-Davidson",
    "Knoxville",
    "Chattanooga",
    "Clarksville",
    "Murfreesboro",
    "Jackson",
    "Franklin",
    "Johnson City",
    "Bartlett",
    "Hendersonville",
    "Kingsport",
    "Collierville",
    "Cleveland",
    "Smyrna",
    "Germantown",
    "Brentwood",
  ].map(renderCity),
  Massachusetts: [
    "Boston",
    "Worcester",
    "Springfield",
    "Lowell",
    "Cambridge",
    "New Bedford",
    "Brockton",
    "Quincy",
    "Lynn",
    "Fall River",
    "Newton",
    "Lawrence",
    "Somerville",
    "Waltham",
    "Haverhill",
    "Malden",
    "Medford",
    "Taunton",
    "Chicopee",
    "Weymouth Town",
    "Revere",
    "Peabody",
    "Methuen",
    "Barnstable Town",
    "Pittsfield",
    "Attleboro",
    "Everett",
    "Salem",
    "Westfield",
    "Leominster",
    "Fitchburg",
    "Beverly",
    "Holyoke",
    "Marlborough",
    "Woburn",
    "Chelsea",
  ].map(renderCity),
  Washington: [
    "Seattle",
    "Spokane",
    "Tacoma",
    "Vancouver",
    "Bellevue",
    "Kent",
    "Everett",
    "Renton",
    "Yakima",
    "Federal Way",
    "Spokane Valley",
    "Bellingham",
    "Kennewick",
    "Auburn",
    "Pasco",
    "Marysville",
    "Lakewood",
    "Redmond",
    "Shoreline",
    "Richland",
    "Kirkland",
    "Burien",
    "Sammamish",
    "Olympia",
    "Lacey",
    "Edmonds",
    "Bremerton",
    "Puyallup",
  ].map(renderCity),
  Colorado: [
    "Denver",
    "Colorado Springs",
    "Aurora",
    "Fort Collins",
    "Lakewood",
    "Thornton",
    "Arvada",
    "Westminster",
    "Pueblo",
    "Centennial",
    "Boulder",
    "Greeley",
    "Longmont",
    "Loveland",
    "Grand Junction",
    "Broomfield",
    "Castle Rock",
    "Commerce City",
    "Parker",
    "Littleton",
    "Northglenn",
  ].map(renderCity),
  District_of_Columbia: ["Washington"].map(renderCity),
  Maryland: [
    "Baltimore",
    "Frederick",
    "Rockville",
    "Gaithersburg",
    "Bowie",
    "Hagerstown",
    "Annapolis",
  ].map(renderCity),
  Kentucky: [
    "Louisville/Jefferson County",
    "Lexington-Fayette",
    "Bowling Green",
    "Owensboro",
    "Covington",
  ].map(renderCity),
  Oregon: [
    "Portland",
    "Eugene",
    "Salem",
    "Gresham",
    "Hillsboro",
    "Beaverton",
    "Bend",
    "Medford",
    "Springfield",
    "Corvallis",
    "Albany",
    "Tigard",
    "Lake Oswego",
    "Keizer",
  ].map(renderCity),
  Oklahoma: [
    "Oklahoma City",
    "Tulsa",
    "Norman",
    "Broken Arrow",
    "Lawton",
    "Edmond",
    "Moore",
    "Midwest City",
    "Enid",
    "Stillwater",
    "Muskogee",
  ].map(renderCity),
  Wisconsin: [
    "Milwaukee",
    "Madison",
    "Green Bay",
    "Kenosha",
    "Racine",
    "Appleton",
    "Waukesha",
    "Eau Claire",
    "Oshkosh",
    "Janesville",
    "West Allis",
    "La Crosse",
    "Sheboygan",
    "Wauwatosa",
    "Fond du Lac",
    "New Berlin",
    "Wausau",
    "Brookfield",
    "Greenfield",
    "Beloit",
  ].map(renderCity),
  Nevada: [
    "Las Vegas",
    "Henderson",
    "Reno",
    "North Las Vegas",
    "Sparks",
    "Carson City",
  ].map(renderCity),
  New_Mexico: [
    "Albuquerque",
    "Las Cruces",
    "Rio Rancho",
    "Santa Fe",
    "Roswell",
    "Farmington",
    "Clovis",
  ].map(renderCity),
  Missouri: [
    "Kansas City",
    "St. Louis",
    "Springfield",
    "Independence",
    "Columbia",
    "Lee's Summit",
    "O'Fallon",
    "St. Joseph",
    "St. Charles",
    "St. Peters",
    "Blue Springs",
    "Florissant",
    "Joplin",
    "Chesterfield",
    "Jefferson City",
    "Cape Girardeau",
  ].map(renderCity),
  Virginia: [
    "Virginia Beach",
    "Norfolk",
    "Chesapeake",
    "Richmond",
    "Newport News",
    "Alexandria",
    "Hampton",
    "Roanoke",
    "Portsmouth",
    "Suffolk",
    "Lynchburg",
    "Harrisonburg",
    "Leesburg",
    "Charlottesville",
    "Danville",
    "Blacksburg",
    "Manassas",
  ].map(renderCity),
  Georgia: [
    "Atlanta",
    "Columbus",
    "Augusta-Richmond County",
    "Savannah",
    "Athens-Clarke County",
    "Sandy Springs",
    "Roswell",
    "Macon",
    "Johns Creek",
    "Albany",
    "Warner Robins",
    "Alpharetta",
    "Marietta",
    "Valdosta",
    "Smyrna",
    "Dunwoody",
  ],
  Nebraska: ["Omaha", "Lincoln", "Bellevue", "Grand Island"].map(renderCity),
  Minnesota: [
    "Minneapolis",
    "St. Paul",
    "Rochester",
    "Duluth",
    "Bloomington",
    "Brooklyn Park",
    "Plymouth",
    "St. Cloud",
    "Eagan",
    "Woodbury",
    "Maple Grove",
    "Eden Prairie",
    "Coon Rapids",
    "Burnsville",
    "Blaine",
    "Lakeville",
    "Minnetonka",
    "Apple Valley",
    "Edina",
    "St. Louis Park",
    "Mankato",
    "Maplewood",
    "Moorhead",
    "Shakopee",
  ].map(renderCity),
  Kansas: [
    "Wichita",
    "Overland Park",
    "Kansas City",
    "Olathe",
    "Topeka",
    "Lawrence",
    "Shawnee",
    "Manhattan",
    "Lenexa",
    "Salina",
    "Hutchinson",
  ].map(renderCity),
  Louisiana: [
    "New Orleans",
    "Baton Rouge",
    "Shreveport",
    "Lafayette",
    "Lake Charles",
    "Kenner",
    "Bossier City",
    "Monroe",
    "Alexandria",
  ].map(renderCity),
  Hawaii: ["Honolulu"].map(renderCity),
  Alaska: ["Anchorage"].map(renderCity),
  New_Jersey: [
    "Newark",
    "Jersey City",
    "Paterson",
    "Elizabeth",
    "Clifton",
    "Trenton",
    "Camden",
    "Passaic",
    "Union City",
    "Bayonne",
    "East Orange",
    "Vineland",
    "New Brunswick",
    "Hoboken",
    "Perth Amboy",
    "West New York",
    "Plainfield",
    "Hackensack",
    "Sayreville",
    "Kearny",
    "Linden",
    "Atlantic City",
  ].map(renderCity),
  Idaho: [
    "Boise City",
    "Nampa",
    "Meridian",
    "Idaho Falls",
    "Pocatello",
    "Caldwell",
    "Coeur d'Alene",
    "Twin Falls",
  ].map(renderCity),
  Alabama: [
    "Birmingham",
    "Montgomery",
    "Mobile",
    "Huntsville",
    "Tuscaloosa",
    "Hoover",
    "Dothan",
    "Auburn",
    "Decatur",
    "Madison",
    "Florence",
    "Gadsden",
  ].map(renderCity),
  Iowa: [
    "Des Moines",
    "Cedar Rapids",
    "Davenport",
    "Sioux City",
    "Iowa City",
    "Waterloo",
    "Council Bluffs",
    "Ames",
    "West Des Moines",
    "Dubuque",
    "Ankeny",
    "Urbandale",
    "Cedar Falls",
  ].map(renderCity),
  Arkansas: [
    "Little Rock",
    "Fort Smith",
    "Fayetteville",
    "Springdale",
    "Jonesboro",
    "North Little Rock",
    "Conway",
    "Rogers",
    "Pine Bluff",
    "Bentonville",
  ].map(renderCity),
  Utah: [
    "Salt Lake City",
    "West Valley City",
    "Provo",
    "West Jordan",
    "Orem",
    "Sandy",
    "Ogden",
    "St. George",
    "Layton",
    "Taylorsville",
    "South Jordan",
    "Lehi",
    "Logan",
    "Murray",
    "Draper",
    "Bountiful",
    "Riverton",
    "Roy",
  ].map(renderCity),
  Rhode_Island: [
    "Providence",
    "Warwick",
    "Cranston",
    "Pawtucket",
    "East Providence",
    "Woonsocket",
  ].map(renderCity),
  Mississippi: [
    "Jackson",
    "Gulfport",
    "Southaven",
    "Hattiesburg",
    "Biloxi",
    "Meridian",
  ].map(renderCity),
  South_Dakota: ["Sioux Falls", "Rapid City"].map(renderCity),
  Connecticut: [
    "Bridgeport",
    "New Haven",
    "Stamford",
    "Hartford",
    "Waterbury",
    "Norwalk",
    "Danbury",
    "New Britain",
    "Meriden",
    "Bristol",
    "West Haven",
    "Milford",
    "Middletown",
    "Norwich",
    "Shelton",
  ].map(renderCity),
  South_Carolina: [
    "Columbia",
    "Charleston",
    "North Charleston",
    "Mount Pleasant",
    "Rock Hill",
    "Greenville",
    "Summerville",
    "Sumter",
    "Goose Creek",
    "Hilton Head Island",
    "Florence",
    "Spartanburg",
  ].map(renderCity),
  New_Hampshire: ["Manchester", "Nashua", "Concord"].map(renderCity),
  North_Dakota: ["Fargo", "Bismarck", "Grand Forks", "Minot"].map(renderCity),
  Montana: ["Billings", "Missoula", "Great Falls", "Bozeman"].map(renderCity),
  Delaware: ["Wilmington", "Dover"].map(renderCity),
  Maine: ["Portland"].map(renderCity),
  Wyoming: ["Cheyenne", "Casper"].map(renderCity),
  West_Virginia: ["Charleston", "Huntington"].map(renderCity),
  Vermont: ["Burlington"].map(renderCity),
};

export const SLIDER: SliderItemProps[] = [
  {
    image: require("../assets/images/group.png"),
    description: "Discover a Sustainable Way to Shop",
  },
  {
    image: require("../assets/images/group.png"),
    description: "Explore, Discover, and Shop",
  },
  {
    image: require("../assets/images/group.png"),
    description: "Discover a World of Eco-Friendly Finds",
  },
];

export const HOME_BANNERS: any[] = [
  {
    image: require("../assets/images/homeBanners.png"),
  },
  {
    image: require("../assets/images/homeBanners.png"),
  },
  {
    image: require("../assets/images/homeBanners.png"),
  },
];

export const COUNTRIES = [
  { title: "Afghanistan", key: "AF" },
  { title: "Åland Islands", key: "AX" },
  { title: "Albania", key: "AL" },
  { title: "Algeria", key: "DZ" },
  { title: "American Samoa", key: "AS" },
  { title: "AndorrA", key: "AD" },
  { title: "Angola", key: "AO" },
  { title: "Anguilla", key: "AI" },
  { title: "Antarctica", key: "AQ" },
  { title: "Antigua and Barbuda", key: "AG" },
  { title: "Argentina", key: "AR" },
  { title: "Armenia", key: "AM" },
  { title: "Aruba", key: "AW" },
  { title: "Australia", key: "AU" },
  { title: "Austria", key: "AT" },
  { title: "Azerbaijan", key: "AZ" },
  { title: "Bahamas", key: "BS" },
  { title: "Bahrain", key: "BH" },
  { title: "Bangladesh", key: "BD" },
  { title: "Barbados", key: "BB" },
  { title: "Belarus", key: "BY" },
  { title: "Belgium", key: "BE" },
  { title: "Belize", key: "BZ" },
  { title: "Benin", key: "BJ" },
  { title: "Bermuda", key: "BM" },
  { title: "Bhutan", key: "BT" },
  { title: "Bolivia", key: "BO" },
  { title: "Bosnia and Herzegovina", key: "BA" },
  { title: "Botswana", key: "BW" },
  { title: "Bouvet Island", key: "BV" },
  { title: "Brazil", key: "BR" },
  { title: "British Indian Ocean Territory", key: "IO" },
  { title: "Brunei Darussalam", key: "BN" },
  { title: "Bulgaria", key: "BG" },
  { title: "Burkina Faso", key: "BF" },
  { title: "Burundi", key: "BI" },
  { title: "Cambodia", key: "KH" },
  { title: "Cameroon", key: "CM" },
  { title: "Canada", key: "CA" },
  { title: "Cape Verde", key: "CV" },
  { title: "Cayman Islands", key: "KY" },
  { title: "Central African Republic", key: "CF" },
  { title: "Chad", key: "TD" },
  { title: "Chile", key: "CL" },
  { title: "China", key: "CN" },
  { title: "Christmas Island", key: "CX" },
  { title: "Cocos (Keeling) Islands", key: "CC" },
  { title: "Colombia", key: "CO" },
  { title: "Comoros", key: "KM" },
  { title: "Congo", key: "CG" },
  { title: "Congo, The Democratic Republic of the", key: "CD" },
  { title: "Cook Islands", key: "CK" },
  { title: "Costa Rica", key: "CR" },
  { title: "Croatia", key: "HR" },
  { title: "Cuba", key: "CU" },
  { title: "Cyprus", key: "CY" },
  { title: "Czech Republic", key: "CZ" },
  { title: "Denmark", key: "DK" },
  { title: "Djibouti", key: "DJ" },
  { title: "Dominica", key: "DM" },
  { title: "Dominican Republic", key: "DO" },
  { title: "Ecuador", key: "EC" },
  { title: "Egypt", key: "EG" },
  { title: "El Salvador", key: "SV" },
  { title: "Equatorial Guinea", key: "GQ" },
  { title: "Eritrea", key: "ER" },
  { title: "Estonia", key: "EE" },
  { title: "Ethiopia", key: "ET" },
  { title: "Falkland Islands (Malvinas)", key: "FK" },
  { title: "Faroe Islands", key: "FO" },
  { title: "Fiji", key: "FJ" },
  { title: "Finland", key: "FI" },
  { title: "France", key: "FR" },
  { title: "French Guiana", key: "GF" },
  { title: "French Polynesia", key: "PF" },
  { title: "French Southern Territories", key: "TF" },
  { title: "Gabon", key: "GA" },
  { title: "Gambia", key: "GM" },
  { title: "Georgia", key: "GE" },
  { title: "Germany", key: "DE" },
  { title: "Ghana", key: "GH" },
  { title: "Gibraltar", key: "GI" },
  { title: "Greece", key: "GR" },
  { title: "Greenland", key: "GL" },
  { title: "Grenada", key: "GD" },
  { title: "Guadeloupe", key: "GP" },
  { title: "Guam", key: "GU" },
  { title: "Guatemala", key: "GT" },
  { title: "Guernsey", key: "GG" },
  { title: "Guinea", key: "GN" },
  { title: "Guinea-Bissau", key: "GW" },
  { title: "Guyana", key: "GY" },
  { title: "Haiti", key: "HT" },
  { title: "Heard Island and Mcdonald Islands", key: "HM" },
  { title: "Holy See (Vatican City State)", key: "VA" },
  { title: "Honduras", key: "HN" },
  { title: "Hong Kong", key: "HK" },
  { title: "Hungary", key: "HU" },
  { title: "Iceland", key: "IS" },
  { title: "India", key: "IN" },
  { title: "Indonesia", key: "ID" },
  { title: "Iran, Islamic Republic Of", key: "IR" },
  { title: "Iraq", key: "IQ" },
  { title: "Ireland", key: "IE" },
  { title: "Isle of Man", key: "IM" },
  { title: "Israel", key: "IL" },
  { title: "Italy", key: "IT" },
  { title: "Jamaica", key: "JM" },
  { title: "Japan", key: "JP" },
  { title: "Jersey", key: "JE" },
  { title: "Jordan", key: "JO" },
  { title: "Kazakhstan", key: "KZ" },
  { title: "Kenya", key: "KE" },
  { title: "Kiribati", key: "KI" },
  { title: "Korea, Republic of", key: "KR" },
  { title: "Kuwait", key: "KW" },
  { title: "Kyrgyzstan", key: "KG" },
  { title: "Latvia", key: "LV" },
  { title: "Lebanon", key: "LB" },
  { title: "Lesotho", key: "LS" },
  { title: "Liberia", key: "LR" },
  { title: "Libyan Arab Jamahiriya", key: "LY" },
  { title: "Liechtenstein", key: "LI" },
  { title: "Lithuania", key: "LT" },
  { title: "Luxembourg", key: "LU" },
  { title: "Macao", key: "MO" },
  { title: "North Macedonia", key: "MK" },
  { title: "Madagascar", key: "MG" },
  { title: "Malawi", key: "MW" },
  { title: "Malaysia", key: "MY" },
  { title: "Maldives", key: "MV" },
  { title: "Mali", key: "ML" },
  { title: "Malta", key: "MT" },
  { title: "Marshall Islands", key: "MH" },
  { title: "Martinique", key: "MQ" },
  { title: "Mauritania", key: "MR" },
  { title: "Mauritius", key: "MU" },
  { title: "Mayotte", key: "YT" },
  { title: "Mexico", key: "MX" },
  { title: "Micronesia, Federated States of", key: "FM" },
  { title: "Moldova, Republic of", key: "MD" },
  { title: "Monaco", key: "MC" },
  { title: "Mongolia", key: "MN" },
  { title: "Montserrat", key: "MS" },
  { title: "Morocco", key: "MA" },
  { title: "Mozambique", key: "MZ" },
  { title: "Myanmar", key: "MM" },
  { title: "Namibia", key: "NA" },
  { title: "Nauru", key: "NR" },
  { title: "Nepal", key: "NP" },
  { title: "Netherlands", key: "NL" },
  { title: "Netherlands Antilles", key: "AN" },
  { title: "New Caledonia", key: "NC" },
  { title: "New Zealand", key: "NZ" },
  { title: "Nicaragua", key: "NI" },
  { title: "Niger", key: "NE" },
  { title: "Nigeria", key: "NG" },
  { title: "Niue", key: "NU" },
  { title: "Norfolk Island", key: "NF" },
  { title: "Northern Mariana Islands", key: "MP" },
  { title: "Norway", key: "NO" },
  { title: "Oman", key: "OM" },
  { title: "Pakistan", key: "PK" },
  { title: "Palau", key: "PW" },
  { title: "Palestinian Territory, Occupied", key: "PS" },
  { title: "Panama", key: "PA" },
  { title: "Papua New Guinea", key: "PG" },
  { title: "Paraguay", key: "PY" },
  { title: "Peru", key: "PE" },
  { title: "Philippines", key: "PH" },
  { title: "Pitcairn Islands", key: "PN" },
  { title: "Poland", key: "PL" },
  { title: "Portugal", key: "PT" },
  { title: "Puerto Rico", key: "PR" },
  { title: "Qatar", key: "QA" },
  { title: "Reunion", key: "RE" },
  { title: "Romania", key: "RO" },
  { title: "Russian Federation", key: "RU" },
  { title: "Rwanda", key: "RW" },
  { title: "Saint Helena", key: "SH" },
  { title: "Saint Kitts and Nevis", key: "KN" },
  { title: "Saint Lucia", key: "LC" },
  { title: "Saint Pierre and Miquelon", key: "PM" },
  { title: "Saint Vincent and the Grenadines", key: "VC" },
  { title: "Samoa", key: "WS" },
  { title: "San Marino", key: "SM" },
  { title: "Sao Tome and Principe", key: "ST" },
  { title: "Saudi Arabia", key: "SA" },
  { title: "Senegal", key: "SN" },
  { title: "Serbia and Montenegro", key: "CS" },
  { title: "Seychelles", key: "SC" },
  { title: "Sierra Leone", key: "SL" },
  { title: "Singapore", key: "SG" },
  { title: "Slovakia", key: "SK" },
  { title: "Slovenia", key: "SI" },
  { title: "Solomon Islands", key: "SB" },
  { title: "Somalia", key: "SO" },
  { title: "South Africa", key: "ZA" },
  { title: "South Georgia and the South Sandwich Islands", key: "GS" },
  { title: "Spain", key: "ES" },
  { title: "Sri Lanka", key: "LK" },
  { title: "Sudan", key: "SD" },
  { title: "Surititle", key: "SR" },
  { title: "Svalbard and Jan Mayen", key: "SJ" },
  { title: "Swaziland", key: "SZ" },
  { title: "Sweden", key: "SE" },
  { title: "Switzerland", key: "CH" },
  { title: "Syrian Arab Republic", key: "SY" },
  { title: "Taiwan", key: "TW" },
  { title: "Tajikistan", key: "TJ" },
  { title: "Tanzania, United Republic of", key: "TZ" },
  { title: "Thailand", key: "TH" },
  { title: "Timor-Leste", key: "TL" },
  { title: "Togo", key: "TG" },
  { title: "Tokelau", key: "TK" },
  { title: "Tonga", key: "TO" },
  { title: "Trinidad and Tobago", key: "TT" },
  { title: "Tunisia", key: "TN" },
  { title: "Turkey", key: "TR" },
  { title: "Turkmenistan", key: "TM" },
  { title: "Turks and Caicos Islands", key: "TC" },
  { title: "Tuvalu", key: "TV" },
  { title: "Uganda", key: "UG" },
  { title: "Ukraine", key: "UA" },
  { title: "United Arab Emirates", key: "AE" },
  { title: "United Kingdom", key: "GB" },
  { title: "United States", key: "US" },
  { title: "United States Minor Outlying Islands", key: "UM" },
  { title: "Uruguay", key: "UY" },
  { title: "Uzbekistan", key: "UZ" },
  { title: "Vanuatu", key: "VU" },
  { title: "Venezuela", key: "VE" },
  { title: "Vietnam", key: "VN" },
  { title: "Virgin Islands, British", key: "VG" },
  { title: "Virgin Islands, U.S.", key: "VI" },
  { title: "Wallis and Futuna", key: "WF" },
  { title: "Western Sahara", key: "EH" },
  { title: "Yemen", key: "YE" },
  { title: "Zambia", key: "ZM" },
  { title: "Zimbabwe", key: "ZN" },
];

export const ID_TYPES = [
  { title: "Passport", key: "Passport" },
  { title: "National ID Card", key: "National ID Card" },
  { title: "Driving License", key: "Driving License" },
];

export const CATEGORIES = [
  {
    created_at: "",
    icon: "",
    id: 1,
    parent_id: "1",
    updated_at: "",
    name: "Fashion",
    title: "Fashion",
    key: 1,
  },
  {
    created_at: "",
    icon: "",
    id: 2,
    parent_id: "2",
    updated_at: "",
    name: "Electronics",
    title: "Electronics",
    key: 2,
  },
  {
    created_at: "",
    icon: "",
    id: 3,
    parent_id: "3",
    updated_at: "",
    name: "Hobbies and Leisure",
    title: "Hobbies and Leisure",
    key: 3,
  },
  {
    created_at: "",
    icon: "",
    id: 4,
    parent_id: "4",
    updated_at: "",
    name: "Home and Living",
    title: "Home and Living",
    key: 4,
  },
  {
    created_at: "",
    icon: "",
    id: 5,
    parent_id: "5",
    updated_at: "",
    name: "Beauty and Health",
    title: "Beauty and Health",
    key: 5,
  },
  {
    created_at: "",
    icon: "",
    id: 6,
    parent_id: "6",
    updated_at: "",
    name: "Auto-motive",
    title: "Auto-motive",
    key: 6,
  },
];

export const HOT_BRANDS = [
  {
    created_at: "",
    icon: "",
    id: 1,
    parent_id: "1",
    updated_at: "",
    name: "Adidas",
    title: "Adidas",
    key: 1,
  },
  {
    created_at: "",
    icon: "",
    id: 2,
    parent_id: "2",
    updated_at: "",
    name: "Rolex",
    title: "Rolex",
    key: 2,
  },
  {
    created_at: "",
    icon: "",
    id: 3,
    parent_id: "3",
    updated_at: "",
    name: "Gucci",
    title: "Gucci",
    key: 3,
  },
  {
    created_at: "",
    icon: "",
    id: 4,
    parent_id: "4",
    updated_at: "",
    name: "Nike",
    title: "Nike",
    key: 4,
  },
  {
    created_at: "",
    icon: "",
    id: 5,
    parent_id: "5",
    updated_at: "",
    name: "Samsung",
    title: "Samsung",
    key: 5,
  },
  {
    created_at: "",
    icon: "",
    id: 6,
    parent_id: "6",
    updated_at: "",
    name: "Apple",
    title: "Apple",
    key: 6,
  },
];
