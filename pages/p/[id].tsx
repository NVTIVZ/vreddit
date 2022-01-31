import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

import Layout from '../../components/Layout';
import styled from 'styled-components';
import { Formik } from 'formik';
import { useAuth } from '../../hooks/use-auth';
import Comment from '../../components/Comment';

interface dataProps {
  content: string;
  creatorId: string;
  title: string;
  comments: [];
}

const PostPage = () => {
  const router = useRouter();
  const [data, setData] = useState<dataProps | DocumentData>();
  const [username, setUsername] = useState();
  const auth = useAuth();
  console.log(router.query.id);
  const { id } = router.query;
  useEffect(() => {
    const retrieveData = async () => {
      const document = await getDoc(doc(db, 'posts', `${id}`));
      const formated = document.data();
      setData(formated);
    };
    retrieveData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    const getUser = async () => {
      const response = await db.collection('users').doc(data?.creatorId).get();
      const formatData = response.data();
      setUsername(formatData?.name);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const deletePost = async () => {
    try {
      await deleteDoc(doc(db, 'posts', `${id}`));
      router.push('/');
    } catch {
      console.log('Deleting failed');
    }
  };

  console.log(data);
  return (
    <Layout>
      <Content>
        <FirstBlock>
          <Points>0</Points>
          <Post>
            <Info>Posted by {username}</Info>
            <Title>{data ? data.title : ''}</Title>
            <Description>{data ? data.content : ''}</Description>
          </Post>
          {auth.user?.uid === data?.creatorId ? (
            <Delete
              onClick={() => {
                deletePost();
              }}
            >
              Delete Post
            </Delete>
          ) : (
            ''
          )}
        </FirstBlock>

        <WriteComment>
          <Formik
            initialValues={{ comment: '' }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await updateDoc(doc(db, 'posts', `${id}`), {
                  comments: arrayUnion({
                    creatorId: auth.user?.uid,
                    content: values.comment,
                    postId: id,
                  }),
                });
                resetForm();
              } catch {
                console.log('Posting Failed');
              }
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
                  <TextArea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.comment}
                    name="comment"
                    placeholder="Comment"
                  />
                  <Button type="submit">Submit</Button>
                </Form>
              );
            }}
          </Formik>
        </WriteComment>
        <CommentSection>
          {data?.comments
            ? data?.comments.map((comment: any, index: number) => (
                <Comment data={comment} key={index} />
              ))
            : 'There is No Posts'}
        </CommentSection>
      </Content>
    </Layout>
  );
};

export default PostPage;

const Content = styled.div`
  margin: 20px auto;

  display: flex;
  flex-direction: column;

  max-width: 1200px;
  min-width: 900px;
`;

const FirstBlock = styled.div`
  display: flex;
  background: #f8f0df;
  flex-direction: row;
  border-radius: 3px;
  min-height: 150px;
  position: relative;
`;

const Points = styled.div`
  margin: 30px 15px 0 15px;
`;

const Info = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 30px 0 0px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 22px;
  margin-top: 5px;
`;

const Description = styled.p`
  margin-top: 10px;
  min-height: 100px;
`;

const WriteComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  background: #f8f0df;
  border-radius: 2px;
`;

const TextArea = styled.textarea`
  resize: vertical;
  min-height: 100px;
  margin: 20px 10px 0 10px;
`;

const Button = styled.button`
  width: 100px;
  color: white;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #232426;
  height: 40px;

  margin: 10px 10px 10px auto;
`;

const CommentSection = styled.div`
  margin-top: 15px;
  display: flex;
  background: #f8f0df;
  flex-direction: column;
  border-radius: 3px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Delete = styled.div`
  position: absolute;
  font-size: 12px;
  right: 0;
  bottom: 0;
  margin-bottom: 5px;
  margin-right: 5px;
  cursor: pointer;
`;
