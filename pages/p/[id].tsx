import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import Layout from '../../components/Layout';
import styled from 'styled-components';

interface dataProps {
  content: string;
  creatorId: string;
  title: string;
}

const PostPage = () => {
  const router = useRouter();
  const [data, setData] = useState<dataProps | DocumentData>();

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
  console.log(data);
  return (
    <Layout>
      <Content>
        <Points>0</Points>
        <Post>
          <Title>{data ? data.title : ''}</Title>
          <Description>{data ? data.content : ''}</Description>
          <WriteComment>
            <TextArea />
            <Button>Submit</Button>
          </WriteComment>
        </Post>
      </Content>
    </Layout>
  );
};

export default PostPage;

const Content = styled.div`
  margin: 20px auto;
  min-height: 150px;
  background: #f8f0df;
  display: flex;
  border-radius: 3px;
  max-width: 1200px;
  min-width: 900px;
`;

const Points = styled.div`
  margin: 10px 15px 0 15px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 15px 0 15px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 22px;
`;

const Description = styled.p`
  margin-top: 10px;
  min-height: 100px;
`;

const WriteComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  resize: vertical;
  width: 100%;
  min-height: 100px;
`;

const Button = styled.button`
  width: 100px;
  margin-left: auto;
  color: white;
  border: none;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  background: #232426;
  height: 40px;
  margin-top: 10px;
`;
