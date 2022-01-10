import { Formik, Form, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import styled from 'styled-components';
import { useAuth } from '../hooks/use-auth';

const Register = () => {
  const auth = useAuth();
  return (
    <Content>
      <Title>Login</Title>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          console.log(values);
          const response = await auth.signup(values.email, values.password);
          console.log(response);
        }}
      >
        {() => {
          return (
            <Form>
              <Field name="email" placeholder="email" />

              <Field name="password" placeholder="password" type="password" />

              <Link href="/forgot-password">Forgot password?</Link>

              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </Content>
  );
};

export default Register;

const Content = styled.div``;

const Title = styled.p``;

const Button = styled.button``;
