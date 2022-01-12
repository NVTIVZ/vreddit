import { Formik } from 'formik';
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { Button, Form, Input, Label, Text, Title } from '../styles/formStyles';

const ForgotPassword = () => {
  const auth = useAuth();
  const [done, setDone] = useState(false);
  return (
    <Layout>
      <Title>Password Recovery</Title>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          try {
            await auth.sendPasswordResetEmail(values.email);
            setDone(true);
            resetForm();
          } catch {
            setDone(true);
            resetForm();
          }
        }}
        validate={(values) => {
          let errors = {} as { email: string };
          // REGEX
          let regex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          console.log(regex.test(values.email));
          // VALIDATION
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!regex.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
      >
        {({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Label>
                Email:
                {touched.email && errors.email && (
                  <Text color="#f24b3f">{errors.email}</Text>
                )}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </Label>
              {done ? (
                <Text>
                  Recovery e-mail has been sent. Check your e-mail inbox
                </Text>
              ) : (
                ''
              )}
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default ForgotPassword;
