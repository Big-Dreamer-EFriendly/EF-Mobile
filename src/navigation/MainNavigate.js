import { View, Text } from 'react-native'
import 'react-native-gesture-handler';
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Login from '../screens/login/Login'
import Home from '../screens/home/Home'
import Register from '../screens/register/Register'
import Profile from '../screens/profile/Profile'
import AddRoom from '../screens/rooms/AddRoom'
import ShowRoom from '../screens/rooms/ShowRoom'
import AllTips from '../screens/tips/AllTips'

const queryClient = new QueryClient();

const MainNavigate = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator>
                    <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="Login"
                    component={Login}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="Profile"
                    component={Profile}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="Add room"
                    component={AddRoom}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="Show room"
                    component={ShowRoom}
                    options={{headerShown: false}} />
                     <Stack.Screen 
                    name="All tips"
                    component={AllTips}
                    options={{headerShown: false}} />
                </Stack.Navigator>
            </QueryClientProvider>
        </NavigationContainer>
    )
}

export default MainNavigate