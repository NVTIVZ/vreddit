import { Formik } from 'formik';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/use-auth';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreatePost = () => {
  const auth = useAuth();
  console.log(auth.user?.uid);
  return (
    <Layout>
      <Title>Create a Post</Title>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values) => {
          console.log(values);
          await addDoc(collection(db, 'posts'), {
            title: values.title,
            content: values.content,
            creatorId: auth.user?.uid,
          });
        }}
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
                <Box>
                  <TitleText
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    name="title"
                    placeholder="Title"
                    maxLength={300}
                  />
                  <Text color="black">{values.title.length}/300</Text>
                </Box>
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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid #ccc;
  align-items: center;
  &:focus-within,
  &:hover {
    border: 1px solid black;
  }
`;

const TitleText = styled.textarea`
  margin-left: 5px;
  font-family: inherit;
  height: 18px;
  min-height: 15px;
  resize: none;
  width: 100%;
  background: none;
  border: none;
  outline: none;
`;
const Title = styled.p`
  margin: 30px auto 20px auto;
  font-size: 36px;
`;

const Text = styled.p`
  color: ${(props) => props.color || '#4d4d4d'};
  margin-right: 5px;
`;

const Button = styled.button`
  width: 100px;
  margin: 0 auto;
  color: white;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #232426;
  height: 40px;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  resize: vertical;
  outline: none;
  width: 600px;
  border-radius: 5px;
  margin-top: 10px;
  min-height: 80px;
  background: #f8f0df;
  height: 200px;
  border: 1px solid #ccc;
  padding: 5px;
  &:focus,
  &:hover {
    border: 1px solid black;
  }
`;

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f8f0df;
  border-radius: 5px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;
