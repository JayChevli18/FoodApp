import React,{useContext, useReducer} from "react";
import { Avatar, List } from "react-native-paper";
import { SafeAreaView, Text, View } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";


export const SettingsScreen=({navigation})=>{
    const {onLogout, user}=useContext(AuthenticationContext);
    return(
        <SafeAreaView>
            <View style={{alignItems:"center"}}>
                <Avatar.Icon size={150} icon="human" color="cyan" style={{backgroundColor:"black", padding:20, marginTop:30}}>
                </Avatar.Icon>
                <Text style={{fontSize:18,color:"black", margin:25, marginBottom:40}}>{user.email}</Text>
            </View>

            <List.Section>
                <List.Item
                    style={{padding:16}}
                    title="Favourites"
                    description="View your favourites"
                    left={(props)=><List.Icon {...props} color="black" icon="heart"></List.Icon>}
                    onPress={()=>navigation.navigate("Favourites")}
                >
                </List.Item>
                <List.Item
                style={{padding:16}}
                title="Logout"
                description="View your favourites"
                left={(props)=><List.Icon {...props} color="black" icon="door"></List.Icon>}
                onPress={onLogout}
                >

                </List.Item>
            </List.Section>
        </SafeAreaView>
    )
}