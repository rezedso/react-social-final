import { useParams } from 'react-router-dom';
import {
  useGetCommunities,
  useGetCommunityMembersCount,
  useGetPost,
} from '../../lib/react-query/queries';
import { Container, Grid } from '@mui/material';
import RecommendedWidget from '../RecommendedWidget';
import { useTheme } from '@emotion/react';
import AboutCommunityWidget from '../AboutCommunityWidget';
import Loader from '../Loader';
import PostWithComment from '../PostWithComment';

const PostPage = () => {
  const params = useParams();
  const theme = useTheme();
  const { data: post } = useGetPost(params?.postId);
  const { data, isLoading } = useGetCommunities();
  const recommended = data?.filter(
    (community) => community?.name != post?.communityName
  );

  const community = data?.find(
    (community) => community?.name === post?.communityName
  );
  const { data: membersCount } = useGetCommunityMembersCount(community?.id);
  return (
    <Container maxWidth='lg'>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container columnSpacing={2}>
          <Grid item xs={12} md={8}>
            <PostWithComment post={post} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AboutCommunityWidget
              theme={theme}
              community={community}
              membersCount={membersCount}
            />
            <RecommendedWidget communities={recommended} theme={theme} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default PostPage;
