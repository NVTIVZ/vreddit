import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';

const Comment = (props: any) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const getUser = async () => {
      const response = await db
        .collection('users')
        .doc(props.data.creatorId)
        .get();
      const formatData = response.data();
      setUsername(formatData?.name);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  console.log(username);
  return (
    <Container>
      <Creator>Posted by {username}</Creator>
      <Content>{props.data.content}</Content>
      <Action></Action>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-left: solid 1px black;
  min-height: 80px;
  margin-top: 10px;
`;

const Creator = styled.p`
  margin-left: 10px;
  margin-top: 5px;
`;

const Content = styled.div`
  margin-top: 5px;
  margin-left: 10px;
`;

const Action = styled.div`
  margin-left: 10px;
`;
