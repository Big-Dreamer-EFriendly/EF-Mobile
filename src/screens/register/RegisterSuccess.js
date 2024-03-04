import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SuccessIllustration from '../../assets/SuccessIllustration.png';
import { useNavigation } from '@react-navigation/native';

const RegisterSuccess = () => {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate('Login');
  };
  return (
        <TouchableOpacity style={styles.containerReSuccess} onPress={goToLogin}>
            <Image source={SuccessIllustration} style={styles.image} />
            <Text style={styles.congratsText}>Congrats!</Text>
            <Text style={styles.infoText}>Save information successfully</Text>
        </TouchableOpacity>
  );
};

export default RegisterSuccess;

const styles = StyleSheet.create({
    containerReSuccess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  congratsText: {
    marginTop: 20,
    fontSize: 30,
    color: '#FF8A1E',
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});
