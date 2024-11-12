// src/screens/SignUpScreen.tsx

import React, { useEffect } from "react";
import {
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/src/redux/auth/auth";
import { RootState } from "@/src/redux/store";
import { AppDispatch } from "../../../src/redux/store"; // Adjust path to your store file

const SignUpScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    lastName: "",
    firstName: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required("Last name is required"),
    firstName: Yup.string().required("First name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignUp = async (values: typeof initialValues) => {
    try {
      await dispatch(register(values)).unwrap(); // Await the async thunk to handle errors here
      router.navigate("/signin");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", (error as any).toString());
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     Alert.alert("Success", "Account created successfully!");
  //     router.navigate("/signin");
  //   }
  //   if (error) {
  //     Alert.alert("Error", error);
  //   }
  // }, [user, error]);

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.title}>Create Account</Title>
      <Subheading style={styles.subheading}>
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
              label="First Name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Last Name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              style={styles.input}
              mode="outlined"
            />

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

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />

            <Button
              mode="contained"
              onPress={handleSubmit as any}
              style={styles.button}
              loading={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            <View style={styles.signinContainer}>
              <TouchableOpacity onPress={() => router.navigate("/signin")}>
                <Text>Already have an account? Sign In</Text>
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
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subheading: {
    textAlign: "center",
    marginBottom: 16,
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
  signinContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
});

export default SignUpScreen;
