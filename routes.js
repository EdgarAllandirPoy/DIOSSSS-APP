import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from './pages/index'
import { PaginaSenhas } from './pages/paginaSenhas'
import { Ionicons } from '@expo/vector-icons/'

const Tab = createBottomTabNavigator();

export function Routes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="sparkles-outline" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="sparkles-outline" />)
                    }
                }}
            />
            <Tab.Screen
                name="paginaSenhas"
                component={PaginaSenhas}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return (<Ionicons size={25} color={"#000"} name="heart-half-outline" />)
                        }
                        return (<Ionicons size={20} color={"#000"} name="heart-half-outline"/>)
                    }
                }}
            />
        </Tab.Navigator>
    )
}