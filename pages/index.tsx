import type { NextPage } from 'next';
import styled from 'styled-components';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PostCard from '../components/PostCard';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Flex>
        <MainArea>
          <CreatePost>
            <Input
              placeholder="Create a Post"
              onClick={() => router.push('/create')}
            />
          </CreatePost>
          <RetrievedPosts>
            <PostCard />
            <PostCard />

            <PostCard />
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

const Input = styled.input`
  width: 98%;
  background: rgba(255, 255, 255, 0.2);
  outline: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 4px 10px 4px 40px;
  padding: 1px 4px;
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
