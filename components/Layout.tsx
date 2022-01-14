import NavBar from './NavBar';
import styled from 'styled-components';

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: 0 25px;
`;
