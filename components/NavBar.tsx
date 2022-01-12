import { useAuth } from '../hooks/use-auth';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const NavBar = (props: any) => {
  const auth = useAuth();
  const [username, setUsername] = useState('user');
  console.log(auth.user?.uid);

  useEffect(() => {
    const getUser = async () => {
      const response = await db.collection('users').doc(auth.user?.uid).get();
      const formatData = response.data();
      setUsername(formatData?.name);
    };
    getUser();
  }, [auth]);

  return (
    <NavbarContainer>
      <Link href="/" passHref>
        <Logo>VREDDIT</Logo>
      </Link>

      <Menu>
        {auth.user ? (
          <>
            {username} ({auth.user.email})
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
  background: #35858b;
  border-bottom: solid 2px rgba(255, 255, 255, 0.3);
`;

const Logo = styled.div`
  font-size: 30px;
  margin-left: 20px;
  cursor: pointer;
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
  background: #4fbdba;
  font-weight: 700;
  margin-left: 10px;
`;
