import {  Text, Platform,  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Login from "./screens/Login";
import Start from "./screens/Start";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import FitScreen from "./screens/FitScreen";
import RestScreen from "./screens/RestScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import { FitnessContext } from './components/Context';
import { useFonts } from "expo-font";
import ActivityScreen from './screens/ActivityScreen';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle:{
        backgroundColor:"rgba(0,0,0,0.9)",
        position: "absolute",
        bottom:0,
        left:0,
        right:0,
        
        elevation:4,
        shadowOffset:{
            width:0,
            height:-4
        },
        borderTopWidth:0 
    }
}}>
    
      <Tab.Screen name="Home" component={Start} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused})=>{
          return (
            <View style={{alignItems: "center", justifyContent: "center"}}> 
              <AntDesign name="home" size={24} color={focused ? "white" : "#b0a077"} />
              <Text style={{color: focused ? "white" : "#b0a077", fontSize: 12, fontFamily: "Rajdhani-Bold"}}>Home</Text>
        </View>
          )
        } 
      }}
      />
      <Tab.Screen name="Workout" component={Home} 
      options={{
        headerShown: false,
        tabBarIcon: ({focused})=>{
          return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
        <MaterialIcons name="fitness-center" size={24} color={focused ?  "white" : "#b0a077"} />
        <Text style={{color: focused ? "white" : "#b0a077", fontSize: 12, fontFamily: "Rajdhani-Bold"}}>Workout</Text>
        </View>
          )
          }  
      }}
      />
      <Tab.Screen name="Activity" component={ActivityScreen}
      options={{
        headerTransparent: false,
        headerShown: false,
        tabBarIcon: ({focused})=>{
          return (
            <View style={{alignItems: "center", justifyContent: "center"}}> 
              <Feather name="activity" size={24} color={focused ? "white" : "#b0a077"} />
              <Text style={{color: focused ? "white" : "#b0a077"
              , fontSize: 12, fontFamily: "Rajdhani-Bold"}}>Activity</Text>
            </View>
          )
        } 
      }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    "Rajdhani-Bold": require("./fonts/Rajdhani-Bold.ttf"),
    "Nordica": require("./fonts/Nordica.otf"),
    "Rajdhani-Regular": require("./fonts/Rajdhani-Regular.ttf"),
    "Rajdhani-Medium": require("./fonts/Rajdhani-Medium.ttf"),
    "Rajdhani-SemiBold": require("./fonts/Rajdhani-SemiBold.ttf"),
    "Rajdhani-Light": require("./fonts/Rajdhani-Light.ttf"),
  });
  
  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <NavigationContainer >
      <FitnessContext>
      <Stack.Navigator>
        <Stack.Screen name="myTabs" component={MyTabs} options={{headerShown: false}}/>
        <Stack.Screen name="Start" component={Start} options={{headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Rest" component={RestScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Activity" component={ActivityScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
      </FitnessContext>
    </NavigationContainer>
  );
}

export default App;