import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Surface } from "react-native-paper";
import { useBrandColors } from "@/src/theme/ThemeContext";
import { router, useLocalSearchParams } from "expo-router";
import { OtpInput } from "react-native-otp-entry";

interface IOTP {
  phoneNumber?: string;
  userType?: string;
  onVerifySuccess?: () => void;
  onResendOTP?: () => void;
  onBack?: () => void;
  embedded?: boolean;
}

const OTP: React.FC<IOTP> = ({ phoneNumber, userType, onVerifySuccess, onResendOTP, onBack, embedded = false }) => {
  const brandColors = useBrandColors();
  const params = useLocalSearchParams();

  // Use props if provided (embedded mode), otherwise use URL params
  const phone = phoneNumber || (params.phone as string);
  const type = userType || (params.userType as string);

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const otpRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResendOTP = () => {
    setTimer(30);
    if (onResendOTP) {
      onResendOTP();
    } else {
      // Default implementation for standalone mode
      // Implement resend OTP logic
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      setError("Please enter a valid OTP");
      return;
    }
    setError("");

    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);

      if (onVerifySuccess) {
        onVerifySuccess();
      } else {
        // Default implementation for standalone mode
        console.log("OTP verified:", otp);
        // Navigate to next screen
      }
    }, 1500);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default implementation for standalone mode
      router.back();
    }
  };

  const content = (
    <View style={styles.content}>
      <Button
        mode='text'
        icon='arrow-left'
        onPress={handleBack}
        style={styles.backButton}
        labelStyle={[styles.backButtonText, { color: brandColors.primary.main }]}
      >
        Change Phone Number
      </Button>

      <Text style={[styles.heading, { color: brandColors.text.primary }]}>Verify Your Number</Text>

      <Text style={[styles.subheading, { color: brandColors.text.secondary }]}>
        We've sent a 4-digit code to {phone ? `${phone.slice(0, 5)}-${phone.slice(5)}` : ""}
      </Text>

      <OtpInput
        ref={otpRef}
        autoFocus={true}
        numberOfDigits={4}
        onTextChange={setOtp}
        focusColor={brandColors.accent.main}
        focusStickBlinkingDuration={500}
        onFilled={(code) => {
          console.log("OTP Filled:", code);
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: {
            ...styles.otpInputContainer,
            borderColor: brandColors.secondary.dark,
          },
          pinCodeTextStyle: {
            ...styles.otpInputText,
            color: brandColors.text.primary,
          },
          focusedPinCodeContainerStyle: {
            borderColor: brandColors.accent.main,
          },
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        mode='contained'
        onPress={handleVerifyOTP}
        loading={isLoading}
        disabled={isLoading || otp.length !== 4}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        buttonColor={brandColors.primary.main}
      >
        VERIFY
      </Button>

      <View style={styles.resendContainer}>
        <Text style={[styles.resendText, { color: brandColors.text.secondary }]}>Didn't receive the code? </Text>
        {timer > 0 ? (
          <Text style={[styles.timerText, { color: brandColors.text.secondary }]}>Resend in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={[styles.resendButton, { color: brandColors.primary.main }]}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  // If embedded, just return the content
  if (embedded) {
    return content;
  }

  // Otherwise, return with the full screen layout
  return (
    <View style={[styles.container, { backgroundColor: brandColors.background.main }]}>
      <Surface style={styles.card}>{content}</Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    borderRadius: 12,
    padding: 24,
    elevation: 4,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  otpContainer: {
    width: "100%",
    marginBottom: 32,
  },
  otpInputContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  otpInputText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 35,
    marginBottom: 35,
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
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
  },
  timerText: {
    fontSize: 14,
  },
  resendButton: {
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 0,
    marginBottom: 24,
    alignSelf: "flex-start",
    marginLeft: -20,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default OTP;
