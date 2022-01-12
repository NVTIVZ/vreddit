import { Formik } from 'formik';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { Button, Form, Input, Label, Text, Title } from '../styles/formStyles';

const ForgotPassword = () => {
  const auth = useAuth();

  return (
    <Layout>
      <Title>Password Recovery</Title>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await auth.sendPasswordResetEmail(values.email);
          console.log(response);
        }}
        validate={(values) => {
          let errors = {} as { email: string; password: string };
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
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default ForgotPassword;
