import ApSafeAreaView from "@/src/components/safeAreaView"
import React, { useContext } from 'react';
import { TextInput, Text, Button } from 'react-native';
import * as Yup from 'yup';
import { AuthContext } from "./context";
import { Formik, Field } from 'formik';
import { router } from "expo-router";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export const SignInPage: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { login, error, loading } = authContext;

  const handleSubmit = async (values: any) => {
    await login(values.email, values.password).then(() => {
    router.navigate('(tabs)')
      
    });
  };

  return (
    <ApSafeAreaView>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
            />
            {touched.email && errors.email ? <Text style={{ color: 'red' }}>{errors.email}</Text> : null}

            <TextInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
            />
            {touched.password && errors.password ? <Text style={{ color: 'red' }}>{errors.password}</Text> : null}

            <Button title="Login" onPress={handleSubmit as any} disabled={loading} />
          </>
        )}
      </Formik>
    </ApSafeAreaView>
  );
};
