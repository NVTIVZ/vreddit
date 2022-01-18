import styled from 'styled-components';

interface dataProps {
  content: string;
  creatorId: string;
  postId: string;
  title: string;
}

const PostCard = (props: dataProps) => {
  return (
    <Card>
      <Points>0</Points>
      <Preview></Preview>
      <Content>
        <Title>{props.title}</Title>
      </Content>
    </Card>
  );
};

export default PostCard;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 65px;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
  color: white;
`;

const Preview = styled.div`
  width: 80px;
  background: yellow;
  margin: 5px 0;
  border-radius: 3px;
`;

const Content = styled.div`
  margin-left: 15px;
  margin: 5px 5px;
`;

const Title = styled.p`
  color: white;
`;
