import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";

const { width, height } = Dimensions.get('window');

const DetailRoom = () => {
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
                data: [820, 932, 901, 934, 1290, 1330, 1620],
                type: "bar"
            }
        ]
    });
    const [hours, setHours] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const decreaseHours = () => {
        if (hours > 0) {
            setHours(hours - 1);
        }
    };

    const increaseHours = () => {
        setHours(hours + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/iconback.png')} style={styles.iconback} />
                <Text style={styles.title}>Living room</Text>
                <Image source={require('../../assets/iconmenu.png')} style={styles.icon} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.whiteButton]}>
                    <Text style={styles.buttonText}>General{'\n'}info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.blueButton]}>
                    <Image source={require('../../assets/air-conditioner.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>

            <View style={styles.actionContainer}>
                <Text style={styles.titlechart}>Air conditioner</Text>
                <Image source={require('../../assets/editroom.png')} style={styles.actionIconedit} />
                <Image source={require('../../assets/trash.png')} style={styles.actionIcon} />
            </View>
            <Text style={styles.titlename}>Name: Samsung 2-way air conditioner 12,000 BTU AR12MSFNJWKNSV</Text>
            <Text style={styles.titlename}>Wattage: 12000kWh</Text>
            <View style={styles.detailContainer}>
                <View>
                    <Text style={styles.wattageText}>Quantity</Text>
                    <View style={styles.wattageContainer}>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={decreaseQuantity} style={[styles.quantityButton, styles.borderGray]}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <View style={[styles.quantityBox, styles.borderGray]}>
                                <Text style={styles.quantityText}>{quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={increaseQuantity} style={[styles.quantityButton, styles.borderGray]}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.hourText}>Hours / day</Text>
                    <View style={styles.hourContainer}>
                        <View style={styles.quantityhourContainer}>
                            <TouchableOpacity onPress={decreaseHours} style={[styles.quantityhourButton, styles.borderGray]}>
                                <Text style={styles.quantityhourButtonText}>-</Text>
                            </TouchableOpacity>
                            <View style={[styles.quantityhourBox, styles.borderGray]}>
                                <Text style={styles.quantityhourText}>{hours}</Text>
                            </View>
                            <TouchableOpacity onPress={increaseHours} style={[styles.quantityhourButton, styles.borderGray]}>
                                <Text style={styles.quantityhourButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Biểu đồ cột */}
            <View style={[styles.chartContainer, { marginTop: 20 }]}>
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
        fontWeight: 'bold',
        marginBottom: height * 0.005
    },
    titlechart: {
        fontSize: 24,
        color: 'black',
        marginTop: height * 0.02,
        color: "rgba(15, 48, 73, 1)",
        fontWeight: 'bold'
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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'orange',
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
    chartContainer: {
        marginTop: 5,
        flex: 1,
        marginLeft: 8
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    actionIcon: {
        width: 24,
        height: 24,
        marginTop: 15,
        marginLeft: 15
    },
    actionIconedit: {
        width: 24,
        height: 24,
        marginLeft: 130,
        marginTop: 15,
    },
    titlename: {
        fontSize: 18,
        color: 'black',
        marginBottom: 10
    },
    actionIconedit: {
        width: 24,
        height: 24,
        marginLeft: 130,
        marginTop: 15,
    },
    wattageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wattageText: {
        marginLeft: 25,
        fontSize: 20,
        color: "black"
    },
    quantityContainer: {
        marginTop: 10,
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'orange',
        borderWidth: 2,
        marginRight: 10,

    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },




    hourContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    hourText: {
        fontSize: 20,
        marginLeft: 15,
        color: "black"
    },
    quantityhourContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityhourButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'orange',
        borderWidth: 2,
        marginRight: 10,

    },
    quantityhourButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityhourBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dddddd',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityhourText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default DetailRoom;
