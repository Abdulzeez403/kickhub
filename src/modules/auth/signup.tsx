// src/screens/SignUpScreen.tsx

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput, Button, Title, Subheading } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

const SignUpScreen: React.FC = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignUp = (values: typeof initialValues) => {
    console.log("Sign Up with", values);
    // Add your sign-up logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title className="text-center">Create Account</Title>
      <Subheading className="text-center">
        Please fill in the details to sign up.
      </Subheading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TextInput
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit as any}
              style={styles.button}
            >
              Sign Up
            </Button>

            <View className=" justify-center items-center pt-2">
              <TouchableOpacity onPress={() => router.navigate("/signin")}>
                <Text>You do have an account? </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});

export default SignUpScreen;
