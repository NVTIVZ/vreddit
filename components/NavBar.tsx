import { useAuth } from '../hooks/use-auth';
import styled from 'styled-components';
import Link from 'next/link';

const NavBar = (props: any) => {
  const auth = useAuth();
  console.log(auth.user?.uid);
  return (
    <NavbarContainer>
      <Logo>VREDDIT</Logo>
      <Menu>
        {auth.user ? (
          <>
            Account ({auth.user.email})
            <Button onClick={() => auth.signout()}>Signout</Button>
          </>
        ) : (
          <>
            <Link href="/register" passHref>
              <Button>Register</Button>
            </Link>
            <Link href="/login" passHref>
              <Button>Login</Button>
            </Link>
          </>
        )}
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;

const NavbarContainer = styled.nav`
  display: flex;
  height: 60px;
  align-items: center;
  background: rgb(211, 236, 245);
`;

const Logo = styled.div`
  font-size: 30px;
  margin-left: 20px;
`;

const Menu = styled.div`
  margin-left: auto;
  margin-right: 20px;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 6px;
  width: 100px;
  height: 40px;
  background: rgb(237, 171, 166);
  font-weight: 700;
  margin-left: 10px;
`;
