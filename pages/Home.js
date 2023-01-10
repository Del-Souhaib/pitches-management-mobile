import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {Text, Card, Button, Icon} from '@rneui/themed';


export default function Home() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // var request = new XMLHttpRequest();
    // request.onreadystatechange = e => {
    //     if (request.readyState !== 4) {
    //         return;
    //     }
    //
    //     if (request.status === 200) {
    //         console.log('success', request.responseText);
    //     } else {
    //         console.warn('error');
    //     }
    // };

    const getStadiums = async () => {
        console.log("here ")
        // request.open('GET', 'http://192.168.1.5:8080/api/pitches');
        // let resData = request.send();
        // fetch('http://192.168.117.89:8080/api/pitches')
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((responseData => {
        //         console.log(responseData);
        //         this.setState({ data: responseData });
        //     }))

        // console.log(resData)
        try {
        const response = await fetch('http://192.168.117.89:8080/api/pitches');
        const json = await response.json();
        console.log(json)
        setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getStadiums();
    }, []);


    return (
        <>
            <ScrollView>
                <View style={styles.container}>
                    {isLoading ? <ActivityIndicator style={{width: 200, height: 200}}/> :
                        data.map( pitch=>
                            <Card>
                                <Card.Title>{pitch.name} </Card.Title>
                                <Card.Divider/>
                                <Card.Image
                                    style={{padding: 0}}
                                    source={{
                                        uri:"http://192.168.117.89:8080/api/storage?filePath=" + pitch.images[0]?.name,
                                    }}
                                />
                                <Text style={{marginBottom: 10,marginTop: 10}}>
                                    {pitch.location+' , '+pitch.ville.name}
                                </Text>
                                <Text style={{marginBottom: 10,marginTop: 10,textAlign:'center',fontSize: 20}}>
                                    {pitch.price+' Dh '}
                                </Text>
                                <Button
                                    // ViewComponent={LinearGradient} // Don't forget this!

                                    icon={
                                        <Icon
                                            name="code"
                                            color="#ffffff"
                                            iconStyle={{marginRight: 10}}
                                        />

                                    }
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,

                                    }}

                                    title="Reserve Now"
                                />
                            </Card>


                        )
                    }
                </View>

            </ScrollView>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});

