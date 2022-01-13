import { Formik } from 'formik';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';

const CreatePost = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Layout>
      <Title>Create a Post</Title>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values) => {}}
        validate={(values) => {
          let errors = {} as { title: string; content: string };

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
                {touched.title && errors.title && (
                  <Text color="#f24b3f">{errors.title}</Text>
                )}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
              </Label>
              <Label>
                {touched.content && errors.content && (
                  <Text color="#f24b3f">{errors.content}</Text>
                )}
                <TextArea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                  name="content"
                  placeholder="Content"
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

export default CreatePost;

const Title = styled.p`
  margin: 30px auto 20px auto;
  font-size: 36px;
  color: #aefeff;
`;

const Text = styled.p``;

const Button = styled.button`
  width: 100px;
  margin: 0 auto;

  border: none;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #4fbdba;
  height: 40px;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  color: #aefeff;
  resize: vertical;
  outline: none;
  width: 600px;
  border-radius: 5px;
  margin-top: 10px;
  min-height: 80px;
  background: #35858b;
  height: 200px;
  border: 1px solid #ccc;
  padding: 5px;
  &:focus,
  &:hover {
    border: 1px solid white;
  }
  &::placeholder {
    color: #aefeff;
  }
`;

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #35858b;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 600px;
  border-radius: 5px;
  color: #aefeff;
  background: #35858b;
  height: 35px;
  border: 1px solid #ccc;
  margin-top: 10px;
  outline: none;
  padding: 0 5px;
  &:focus,
  &:hover {
    border: 1px solid white;
  }
  &::placeholder {
    color: #aefeff;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;
