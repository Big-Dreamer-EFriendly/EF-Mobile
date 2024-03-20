import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useGetUser from '../../hooks/useGetUser';
import useEditProfile from '../../hooks/useEditProfile';
import DropdownComponent from '../../components/dropdown/DropdownComponent';

const { width, height } = Dimensions.get('window');

const EditProfile = ({ navigation }) => {
    const { data: dataUser, isLoading: isLoading } = useGetUser();
    const { handleEditProfile } = useEditProfile({ navigation });
    console.log(dataUser);

    const inputRef = useRef();

    const initialValues = {
        name: dataUser?.user.name,
        email: dataUser?.user.email,
        address: dataUser?.user.address,
        member: dataUser?.user.member,
    };

    const [selectedProvince, setSelectedProvince] = useState('');

    const handleProvinceChange = (province) => {
        setSelectedProvince(province);
    };

    const Signup_Schema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9\sàáạãảăắằẳẵặâấầẩẫậèéẹẽẻêếềểễệđìíịĩỉóòọõỏôốồổỗộơớờởỡợùúụũủưứừửữựỳỹỷỵÀÁẠÃẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẼẺÊẾỀỂỄỆĐÌÍỊĨỈÓÒỌÕỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚỤŨỦƯỨỪỬỮỰỲỸỶỴ]+$/, 'Name cannot contain special characters')
            .min(5, 'Name must be at least 5 characters!')
            .max(50, 'Name must have a maximum of 50 characters!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        member: Yup.number()
            .min(1, 'Family members must be at least 1')
            .required('Required'),
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('BottomTabs')}>
                    <Image source={require("../../assets/iconback.png")} style={styles.iconback} />
                </TouchableOpacity>
                <Text style={styles.title}>Update profile</Text>
            </View>
            <Formik
                initialValues={initialValues}
                validationSchema={Signup_Schema}
                onSubmit={(values) => {
                    console.log('Form Data:', values);
                    setTimeout(() => {
                        let account = {
                            name: values.name,
                            email: values.email,
                            address: selectedProvince,
                            member: values.member,
                        };
                        handleEditProfile(account);
                    }, 100);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formContainer}>
                        <View style={styles.textInput}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputContainer}>
                                <Image
                                    source={require('../../assets/user.png')}
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Name"
                                    placeholderTextColor={'#999999'}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                            </View>
                            {errors.name && touched.name ? (
                                <Text style={styles.errorText}>* {errors.name}</Text>
                            ) : null}

                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <Image
                                    source={require('../../assets/email.png')}
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Your Email"
                                    placeholderTextColor={'#999999'}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />
                            </View>
                            {errors.email && touched.email ? (
                                <Text style={styles.errorText}>* {errors.email}</Text>
                            ) : null}

                            <Text style={styles.label}>Province</Text>
                            <DropdownComponent onProvinceChange={handleProvinceChange} defautProvince={{ lable: values?.address, value: values?.address }} />
                            {console.log(values.address)}
                            <Text style={styles.label}>Family Members</Text>
                            <View style={styles.inputContainer}>
                                <Image
                                    source={require('../../assets/member.png')}
                                    style={styles.icon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Number of Family Members"
                                    placeholderTextColor={'#999999'}
                                    keyboardType="numeric"
                                    onChangeText={handleChange('member')}
                                    onBlur={handleBlur('member')}
                                    value={values.member?.toString()}
                                />
                            </View>
                            {errors.member && touched.member ? (
                                <Text style={styles.errorText}>* {errors.member}</Text>
                            ) : null}
                        </View>
                        <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
                            <Text style={{
                                color: 'white',
                                fontSize: width * 0.045,
                                fontWeight: 'bold'
                            }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: height * 0.02,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
    },
    title: {
        fontSize: width * 0.055,
        color: '#0F3049',
        fontWeight: '700',
        marginLeft: width * 0.25
    },
    iconback: {
        width: width * 0.02,
        height: height * 0.02,
    },
    formContainer: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
    },
    label: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
    },
    input: {
        fontSize: width * 0.035,
        color: 'black',
        width: width * 0.64
    },
    error: {
        color: 'red',
        marginBottom: height * 0.01,
    },
    inputContainer: {
        height: height * 0.07,
        width: width * 0.8,
        paddingVertical: 0,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: 'rgba(217, 217, 217, 0.25)',
        borderRadius: 17,
        color: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
    btn: {
        backgroundColor: '#FF8A1E',
        paddingVertical: height * 0.02,
        borderRadius: 15,
        alignItems: 'center',
        paddingHorizontal: width * 0.06,
        marginTop: height * 0.02,
        marginHorizontal: width * 0.17
    }
});

export default EditProfile;
