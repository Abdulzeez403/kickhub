import React, { useContext, useState } from "react";
import { TextInput, Text, Button, View } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { AuthContext } from "./context";
import { router } from "expo-router";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const SignUpPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { register, error, loading } = authContext;

  const handleSubmit = (values: { email: string; password: string }) => {
    register(values.email, values.password).then(() => {
      router.navigate("signin");
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
            />
            {touched.email && errors.email ? (
              <Text style={{ color: "red" }}>{errors.email}</Text>
            ) : null}

            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              secureTextEntry
              style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
            />
            {touched.password && errors.password ? (
              <Text style={{ color: "red" }}>{errors.password}</Text>
            ) : null}

            {error && <Text style={{ color: "red" }}>{error}</Text>}

            <Button
              title="Sign Up"
              onPress={handleSubmit as any}
              disabled={loading}
            />
            {loading && <Text>Loading...</Text>}
          </>
        )}
      </Formik>
    </View>
  );
};
