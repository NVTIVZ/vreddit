import { useAuth } from '../hooks/use-auth';
import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { GetUsername } from '../hooks/get-username';

const NavBar = (props: any) => {
  const auth = useAuth();

  const username = GetUsername(auth.user?.uid);

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
  background: #c8c6c6;
  border-bottom: solid 2px black;
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
  color: white;
  border-radius: 6px;
  width: 100px;
  height: 40px;
  background: #232426;
  font-weight: 700;
  margin-left: 10px;
`;
