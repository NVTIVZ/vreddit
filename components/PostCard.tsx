import styled from 'styled-components';
import NextLink from 'next/link';
import Image from 'next/image';

interface dataProps {
  content: string;
  creatorId: string;
  postId: string;
  title: string;
  comments: CommentProps[];
}

interface CommentProps {
  content: string;
  creatorId: string;
  postId: string;
}

const PostCard = (props: dataProps) => {
  return (
    <NextLink href={`/p/${props.postId}`}>
      <Card>
        <Points>0</Points>

        <Preview></Preview>
        <Content>
          <Title>{props.title}</Title>
          <Buttons>
            {props.comments.length === 1
              ? `${props.comments.length} comment`
              : `${props.comments.length} comments`}
          </Buttons>
        </Content>
      </Card>
    </NextLink>
  );
};

export default PostCard;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 65px;
  background: #f8f0df;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
`;

const Preview = styled.div`
  width: 80px;
  background: gray;
  margin: 5px 0;
  border-radius: 3px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin: 5px 5px;
`;

const Title = styled.p``;

const Buttons = styled.div`
  margin-top: auto;
  font-size: 13px;
  font-weight: 700;
`;
