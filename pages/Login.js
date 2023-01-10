import React, {useState} from "react";
import {SafeAreaView, StyleSheet, TextInput} from "react-native";
import {Button, Text} from "@rneui/base";


export default function Login() {
    let [email, setEmail] = useState(null)
    let [password, setPassword] = useState(null)

    function loginFunction(){
        const formData = new FormData();

        formData.append("username", email)
        formData.append("password", password)

        fetch('http://192.168.117.89:8080/api/login', {
            method: 'POST', // or 'PUT'
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('reponse '+data)

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    return (

        <SafeAreaView style={{padding: 20}}>
            <TextInput
                style={styles.input}
                onChangeText={e => setEmail(e)}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                onChangeText={e => setPassword(e)}
                placeholder="Password"
                keyboardType="visible-password"
            />
            <Button onPress={loginFunction}>Login</Button>
            <Text>You dont have an Account? Sign Up</Text>


        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
