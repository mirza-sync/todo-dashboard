import { styled } from "styled-components";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import Button from "./ui/Button";

const Nav = styled.nav`
  height: 72px;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  margin-bottom: 12px;
  width: 100%;

  @media (min-width: 769px) {
    margin-bottom: 22px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin-inline: 24px;

  @media (min-width: 769px) {
    max-width: 960px;
    margin-inline: auto;
  }
`;

const Profile = styled.nav`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #e8ecec;
  margin-right: 16px;
`;

const Text = styled.span`
  font: normal normal 500 16px/19px Montserrat;
  color: #6d8187;
  text-transform: capitalize;
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Nav>
      <Wrapper>
        <Profile>
          <Avatar />
          <Text>{user?.username}</Text>
        </Profile>
        <Button widthFull={false} ghost onClick={() => handleLogout()}>
          <Text>Logout</Text>
        </Button>
      </Wrapper>
    </Nav>
  );
};

export default Navbar;
