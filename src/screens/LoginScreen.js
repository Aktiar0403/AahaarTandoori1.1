import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [code, setCode] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!mobileNumber || !code) {
      Alert.alert('Error', 'Please enter mobile number and code');
      return;
    }

    try {
      const result = await login(mobileNumber, code);
      if (result.success) {
        navigation.replace('Main');
      }
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2d1b0e']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Aahaar</Text>
            <Text style={styles.subLogoText}>Tandoori Restaurant</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor="#8b7355"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Secret Code"
              placeholderTextColor="#8b7355"
              value={code}
              onChangeText={setCode}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <LinearGradient
                colors={['#d4af37', '#b8941f']}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.helpText}>
              <Text style={styles.helpTextTitle}>Need a code?</Text>
              <Text style={styles.helpTextBody}>
                For admin access: AAHAR2024{'\n'}
                For customer access: CUSTOMER24
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#d4af37',
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subLogoText: {
    fontSize: 18,
    color: '#8b7355',
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: 'rgba(45, 27, 14, 0.8)',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8b7355',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderColor: '#d4af37',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  helpText: {
    marginTop: 30,
    alignItems: 'center',
  },
  helpTextTitle: {
    color: '#d4af37',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  helpTextBody: {
    color: '#8b7355',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoginScreen;