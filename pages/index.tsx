import type { NextPage } from 'next';
import styled from 'styled-components';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PostCard from '../components/PostCard';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

interface dataProps {
  content: string;
  creatorId: string;
  postId: string;
  title: string;
  created: Timestamp;
  comments: [];
}

const Home: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<dataProps[]>();
  useEffect(() => {
    const retrieveData = async () => {
      let posty: any = [];
      const querySnapshot = await getDocs(
        query(collection(db, 'posts'), orderBy('created', 'desc'))
      );
      querySnapshot.forEach((doc) => {
        const retrieved = doc.data();
        posty.push({
          postId: doc.id,
          ...retrieved,
        });
      });
      setData(posty);
    };
    retrieveData();
  }, []);

  console.log(data);
  return (
    <Layout>
      <Flex>
        <MainArea>
          <CreateButton onClick={() => router.push('/create')}>
            Create a Community
          </CreateButton>

          <RetrievedPosts>
            {data
              ? data.map((post) => (
                  <PostCard
                    content={post.content}
                    creatorId={post.creatorId}
                    title={post.title}
                    postId={post.postId}
                    comments={post.comments}
                    created={post.created}
                    key={post.postId}
                  />
                ))
              : 'Loading'}
          </RetrievedPosts>
        </MainArea>
        <SideBar></SideBar>
      </Flex>
    </Layout>
  );
};

export default Home;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const CreatePost = styled.div`
  border: 1px solid #ccc;
  height: 40px;
  display: flex;
  border-radius: 3px;
`;

const CreateButton = styled.button`
  color: white;
  background: black;
  border: none;
  width: 100px;
  height: 40px;
  border-radius: 3px;
`;

const MainArea = styled.div`
  width: 100%;
  margin-right: 25px;
`;

const SideBar = styled.div`
  border: 1px solid #ccc;
  width: 400px;
  height: 300px;
  border-radius: 3px;
`;

const RetrievedPosts = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin-top: 20px;
  border-radius: 3px;
  & > div:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
`;
