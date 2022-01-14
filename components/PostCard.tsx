import styled from 'styled-components';

const PostCard = () => {
  return (
    <Card>
      <Points>0</Points>
      <Preview></Preview>
      <Content></Content>
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
`;

const Content = styled.div``;
