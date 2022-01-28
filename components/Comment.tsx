import React from 'react';
import styled from 'styled-components';

const Comment = (props: any) => {
  return (
    <Container>
      <Creator>Posted by {props.data.creatorId}</Creator>
      <Content>{props.data.content}</Content>
      <Action></Action>
    </Container>
  );
};

export default Comment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px black;
  min-height: 80px;
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
