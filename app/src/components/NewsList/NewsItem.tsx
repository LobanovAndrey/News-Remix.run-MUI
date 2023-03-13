import React, { FC } from 'react';
import {
  Badge,
  Box,
  Card,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { IPost } from 'models/news.interfaces';
import { orange, pink } from '@mui/material/colors';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from '@remix-run/react';
import { format } from 'date-fns';

interface NewsItemProps {
  index: number;
  style: any;
  data: {
    posts: IPost[];
  };
}

const NewsItem: FC<NewsItemProps> = ({ index, style, data }) => {
  const { posts } = data;
  const post = posts[index];
  const loading = !post;

  return (
    <Box style={style} sx={{ width: '100%' }}>
      <Card sx={{ px: 2, pt: 1, pb: 1 }} variant={'elevation'} elevation={0}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton
                animation='wave'
                variant='rounded'
                width={40}
                height={60}
              />
            ) : (
              <Badge
                sx={{ color: pink[900], mr: 1 }}
                color='primary'
                overlap='rectangular'
                badgeContent={post?.score}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                aria-label='score-badge'
              >
                <StarOutlineOutlinedIcon
                  color='disabled'
                  sx={{ color: orange[500] }}
                />
              </Badge>
            )
          }
          title={
            loading ? (
              <Skeleton
                animation='wave'
                height={20}
                width='80%'
                style={{ marginBottom: 6 }}
              />
            ) : (
              <Typography
                aria-label='header'
                fontWeight={600}
                variant='subtitle1'
              >
                {index + 1}. {post.title}
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation='wave' height={15} width='60%' />
            ) : (
              <Typography
                aria-label='sub-header'
                color='text.secondary'
                variant='body2'
                component='h3'
              >
                {post.by} posted{' '}
                {format(new Date(post?.time * 1000), 'd MMM yyyy HH:mm')}
              </Typography>
            )
          }
          action={
            loading ? (
              <Skeleton
                sx={{ marginRight: '15px' }}
                animation='wave'
                variant='circular'
                width={40}
                height={40}
              />
            ) : (
              <Link
                prefetch='intent'
                to={`${posts[index].id}`}
                style={{ marginRight: '15px' }}
              >
                <IconButton aria-label='go-to-news'>
                  <ArrowForwardIosIcon color='primary' fontSize='small' />{' '}
                </IconButton>
              </Link>
            )
          }
        />
      </Card>
    </Box>
  );
};

export default React.memo(NewsItem);
