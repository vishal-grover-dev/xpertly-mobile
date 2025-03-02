import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
import { Text, TextInput, Button, SegmentedButtons, Surface, ActivityIndicator } from "react-native-paper";
import { useBrandColors } from "@/src/theme/ThemeContext";
import Logo from "@/src/components/Logo.component";
import OTPVerificationScreen from "../components/OTP.component";

type UserType = "expert" | "customer";
type ScreenState = "login" | "otp" | "loading";

const LoginScreen: React.FC = () => {
  const brandColors = useBrandColors();
  const [userType, setUserType] = useState<UserType>("customer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");
  const [screenState, setScreenState] = useState<ScreenState>("login");

  const formatPhoneNumber = (text: string) => {
    // Only add hyphen if we have more than 5 digits
    if (text.length > 5) {
      return `${text.slice(0, 5)}-${text.slice(5, 10)}`;
    }
    return text;
  };

  const handlePhoneChange = (text: string) => {
    // Remove any non-digit characters from input
    const cleaned = text.replace(/\D/g, "");

    // Store raw digits
    setPhoneNumber(cleaned);

    // Display formatted version
    setFormattedPhoneNumber(formatPhoneNumber(cleaned));
  };

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      return;
    }

    setScreenState("loading");

    // Simulate API call
    setTimeout(() => {
      setScreenState("otp");
    }, 1500);
  };

  const handleVerifySuccess = () => {
    // Handle successful verification
    console.log("OTP verified for", userType);
    // Navigate to appropriate screen
  };

  const handleBackToLogin = () => {
    setScreenState("login");
  };

  const renderLoginForm = () => (
    <>
      <Text style={[styles.heading, { color: brandColors.text.primary }]}>Welcome to Xpertly</Text>

      <View style={styles.formContainer}>
        {/* User type selector */}
        <Text style={[styles.inputLabel, { color: brandColors.text.secondary }]}>Login as</Text>
        <SegmentedButtons
          value={userType}
          onValueChange={(value) => setUserType(value as UserType)}
          buttons={[
            { value: "customer", label: "Customer" },
            { value: "expert", label: "Expert" },
          ]}
          style={styles.segmentedButtons}
          theme={{
            colors: {
              secondaryContainer: brandColors.accent.main,
              onSecondaryContainer: brandColors.accent.text,
              outline: brandColors.accent.light,
            },
            animation: {
              scale: 1.0,
              defaultAnimation: {
                duration: 300,
                easing: Platform.OS === "ios" ? "easeInOut" : "linear",
              },
            },
          }}
        />

        {/* Phone number input */}
        <Text style={[styles.inputLabel, { color: brandColors.text.secondary }]}>Mobile Number</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            mode='outlined'
            value='+91'
            disabled
            style={styles.countryCode}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
          />
          <TextInput
            mode='outlined'
            placeholder='Enter your phone number'
            value={formattedPhoneNumber}
            onChangeText={handlePhoneChange}
            style={styles.phoneInput}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            keyboardType='phone-pad'
            maxLength={12} // Account for the hyphen
          />
        </View>

        {/* Sign in button with high contrast */}
        <Button
          mode='contained'
          onPress={handleSendOTP}
          disabled={phoneNumber.length < 10}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          buttonColor={brandColors.primary.main}
        >
          SIGN IN
        </Button>
      </View>
    </>
  );

  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color={brandColors.primary.main} />
      <Text style={[styles.loadingText, { color: brandColors.text.secondary }]}>
        {screenState === "otp" ? "Verifying OTP..." : "Sending OTP..."}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        {/* Top section with dark background and logo */}
        <View style={[styles.topSection, { backgroundColor: "#212121" }]}>
          <Logo size='large' darkMode={true} />
        </View>

        {/* Bottom section with white card */}
        <Surface style={styles.cardContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {screenState === "login" && renderLoginForm()}
            {screenState === "otp" && (
              <OTPVerificationScreen
                phoneNumber={phoneNumber}
                userType={userType}
                onVerifySuccess={handleVerifySuccess}
                onResendOTP={() => {
                  setScreenState("loading");
                  setTimeout(() => setScreenState("otp"), 1000);
                }}
                onBack={handleBackToLogin}
                embedded={true}
              />
            )}
            {screenState === "loading" && renderLoading()}
          </ScrollView>
        </Surface>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  cardContainer: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  segmentedButtons: {
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  countryCode: {
    width: 70,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
  },
  inputContent: {
    paddingVertical: 8,
  },
  inputOutline: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    marginTop: 35,
    borderRadius: 12,
    width: "100%",
  },
  buttonContent: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LoginScreen;
