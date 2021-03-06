import styled from 'styled-components';
import NextLink from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { db } from '../firebase';

interface dataProps {
  content: string;
  creatorId: string;
  postId: string;
  title: string;
  created: Timestamp;
  comments: CommentProps[];
  community: string | string[] | undefined;
}

interface CommentProps {
  content: string;
  creatorId: string;
  postId: string;
}

interface DetailsProps {
  isActive: boolean;
}

const PostCard = (props: dataProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const router = useRouter();
  const [username, setUsername] = useState();
  useEffect(() => {
    const getUser = async () => {
      const response = await db.collection('users').doc(props?.creatorId).get();
      const formatData = response.data();
      setUsername(formatData?.name);
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  console.log(showDetails);
  return (
    <>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/r/${props.community}/${props.postId}`);
        }}
      >
        <Points>0</Points>
        <Preview></Preview>
        <Content>
          <Title>{props.title}</Title>
          <PostCreated>
            Postedy by {username} {moment(props.created.toDate()).fromNow()}
          </PostCreated>
          <Buttons onClick={(e) => e.stopPropagation()}>
            {showDetails ? (
              <Item onClick={() => setShowDetails(false)}>Hide</Item>
            ) : (
              <Item onClick={() => setShowDetails(true)}>Show</Item>
            )}
            <Item>
              {props.comments?.length === 1
                ? `${props.comments?.length} comment`
                : `${props.comments?.length || 0} comments`}
            </Item>
          </Buttons>
        </Content>
      </Card>
      <Details isActive={showDetails}>
        {showDetails ? props.content : ''}
      </Details>
    </>
  );
};

export default PostCard;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 65px;
  background: #f8f0df;
  cursor: pointer;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  margin: 0 15px;
`;

const Preview = styled.div`
  min-width: 80px;
  background: gray;
  margin: 5px 0;
  height: 55px;
  border-radius: 3px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin: 5px 5px;
`;

const Title = styled.p`
  &:first-letter {
    text-transform: capitalize;
  }
`;

const PostCreated = styled.div`
  font-size: 13px;
`;

const Buttons = styled.div`
  display: flex;
  margin-top: auto;
  font-size: 13px;
  font-weight: 700;
  flex-direction: row;
`;

const Item = styled.div`
  margin-right: 5px;
`;

const Details = styled.div<DetailsProps>`
  background: #f8f0df;
  ${({ isActive }) =>
    isActive &&
    `
    padding:5px;
  `}
`;
