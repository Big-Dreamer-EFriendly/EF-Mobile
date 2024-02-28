import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, Dimensions } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";

const { width, height } = Dimensions.get('window');

const EditRoom = () => {
    const [chartData, setChartData] = useState({
        // Dữ liệu biểu đồ cột
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "bar"
            }
        ]
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
                <Text style={styles.title}>Living room</Text>
                <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.blueButton]}>
                    <Text style={styles.buttonText}>General{'\n'}info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.whiteButton]}>
                    <Image source={require('../../assets/air-conditioner.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.rectangularButton}>
                <View style={styles.rectangularButtonContent}>
                    <Image source={require('../../assets/warning.png')} style={styles.rectangularButtonImage} />
                    <Text style={styles.rectangularButtonText}>Your air conditioner is{'\n'}consuming a lot of electricity</Text>
                </View>
            </TouchableOpacity>
            <Text style={styles.titlechart}>Estimated graph</Text>

            {/* Biểu đồ cột */}
            <View style={styles.chartContainer}>
                <ECharts option={chartData} backgroundColor="transparent" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.02,
    },
    title: {
        fontSize: 26,
        color: 'black',
        fontWeight:'bold',
        marginBottom: height * 0.005
    },
    titlechart: {
        fontSize: 24,
        color: 'black',
        marginTop: height * 0.02,
        color: "rgba(15, 48, 73, 1)",
        fontWeight:'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 40,
    },
    button: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    buttonImage: {
        width: 80,
        height: 80,
    },
    blueButton: {
        backgroundColor: 'rgba(15, 48, 73, 1)',
    },
    whiteButton: {
        backgroundColor: '#ffffff',
    },
    rectangularButton: {
        width: 350,
        height: 80,
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#9C9C9C',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    rectangularButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rectangularButtonImage: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
    rectangularButtonText: {
        fontSize: 18,
        color: 'black',
    },
    chartContainer: {
        marginTop: 20,
        flex: 1,
    },
});

export default EditRoom;



// import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
// import { ECharts } from "react-native-echarts-wrapper";
 
// const EditRoom = () => {
//   option = {
//     xAxis: {
//       type: "category",
//       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//     },
//     yAxis: {
//       type: "value"
//     },
//     series: [
//       {
//         data: [820, 932, 901, 934, 1290, 1330, 1320],
//         type: "line"
//       }
//     ]
//   };
 
//     return (
//       <View style={styles.chartContainer}>
//         <ECharts
//           option={this.option}
//           backgroundColor="rgba(93, 169, 81, 0.3)"
//         />
//       </View>
//     );
  
// }
 
// export default EditRoom;
// const styles = StyleSheet.create({
//   chartContainer: {
//     flex: 1
//   }
// });

