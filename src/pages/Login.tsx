import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import Card from "../components/ui/Card";
import styled from "styled-components";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-inline: 12px;
`;

const Wrapper = styled.div`
  @media (min-width: 769px) {
    width: 296px;
    height: 249px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  background: #eef1f8;
  border-radius: 8px;
  height: 40px;
  border: none;
  padding-left: 1rem;
  width: 100%;
  margin-bottom: 12px;
`;

const Login = () => {
  const { isLoading, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    await login(userid, username);
    navigate("/dashboard");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container>
      <Wrapper>
        <Card>
          <Title>Login</Title>
          <form style={{ marginTop: "24px" }}>
            <Input
              type="text"
              id="userid"
              placeholder="Id"
              onChange={(e) => setUserid(e.target.value)}
            />
            <Input
              type="text"
              id="username"
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={() => handleLogin()}>Login</Button>
          </form>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Login;
