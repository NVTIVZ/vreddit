import { useAuth } from '../hooks/use-auth';
import styled from 'styled-components';
import Link from 'next/link';

const NavBar = (props: any) => {
  const auth = useAuth();
  return (
    <NavbarContainer>
      <Logo />
      <Menu>
        {auth.user ? (
          <>
            Account ({auth.user.email})
            <Button onClick={() => auth.signout()}>Signout</Button>
          </>
        ) : (
          <Link href="/signin">Signin</Link>
        )}
      </Menu>
    </NavbarContainer>
  );
};

export default NavBar;

const NavbarContainer = styled.nav``;

const Logo = styled.div``;

const Menu = styled.div``;

const Button = styled.button``;
