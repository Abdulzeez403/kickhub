import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";
import { TextInput, Button, Title, Subheading } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { login } from "@/src/redux/auth/auth";
import { AppDispatch } from "../../../src/redux/store"; // Adjust path to your store file

const SignInScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSignIn = async (values: typeof initialValues) => {
    try {
      await dispatch(login(values)).unwrap(); // Await the async thunk to handle errors here
      router.navigate("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", (error as any).toString());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title className="text-center">Sign In</Title>
      <Subheading className="text-center pb-2">
        Welcome back! Please sign in to continue.
      </Subheading>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
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
            {/* {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )} */}

            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            {/* {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )} */}

            <Button
              mode="contained"
              onPress={handleSubmit as any}
              style={styles.button}
              loading={loading}
            >
              Sign In
            </Button>

            <View className=" justify-center items-center pt-2">
              <TouchableOpacity onPress={() => router.navigate("/signup")}>
                <Text>You don't have an account yet? </Text>
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

export default SignInScreen;
