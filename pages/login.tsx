import { Formik } from 'formik';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { Button, Form, Input, Label, Text, Title } from '../styles/formStyles';
import { useRouter } from 'next/router';

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Layout>
      <Title>Login</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await auth.signin(values.email, values.password);
          console.log(response);
          router.push('/');
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

          if (!values.password) {
            errors.password = 'A password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be 6 characters';
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
              <Label>
                Password:
                {touched.password && errors.password && (
                  <Text color="#f24b3f">{errors.password}</Text>
                )}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  name="password"
                  placeholder="Password"
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

export default Login;
