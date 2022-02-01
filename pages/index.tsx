import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Flex>
        <MainArea>
          <CreateButton onClick={() => router.push('/create')}>
            Create a Community
          </CreateButton>
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

const CreateButton = styled.button`
  color: white;
  background: black;
  border: none;
  width: 120px;
  height: 50px;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
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
