import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { convert } from 'html-to-text';
import { FC, ReactNode } from 'react';
import { CommentTree } from './CommentsTree';

interface PostProps {
  title?: string;
  text?: string;
  url?: string;
  descendants?: number;
  time?: number;
  by?: string;
  kids?: number[];
}

const PostCardActionText: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <Typography color='text.secondary' variant='overline' component='h3'>
      {children}
    </Typography>
  );
};

export const Post: FC<PostProps> = ({
  title,
  text,
  url,
  descendants,
  time,
  by,
  kids,
}) => {
  return (
    <>
      <Card
        sx={{
          px: 5,
          pt: 5,
          display: 'flex',
          flexDirection: 'column',
        }}
        variant='elevation'
        elevation={0}
      >
        <CardHeader
          title={
            <>
              <Typography variant='h4' component='h2' gutterBottom>
                {title ?? 'Just a news'}
              </Typography>
              {text && <Divider />}
            </>
          }
        />

        {text && (
          <CardContent>
            <Typography variant='body1' sx={{ ml: 2 }} component='p'>
              {convert(text)}
            </Typography>
          </CardContent>
        )}

        <CardActions
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            gap: '5%',
          }}
        >
          {url && (
            <PostCardActionText>
              <Link href={url} underline='none'>
                source url
              </Link>
            </PostCardActionText>
          )}

          {descendants !== undefined && descendants !== 0 && (
            <PostCardActionText>comments {descendants}</PostCardActionText>
          )}

          {time && (
            <PostCardActionText>
              {format(new Date(time * 1000), 'd MMM yyyy HH:mm')}
            </PostCardActionText>
          )}

          {by && <PostCardActionText>Author {by}</PostCardActionText>}
        </CardActions>

        <Divider sx={{ mx: 2 }} />
      </Card>

      {kids && kids.length > 0 && (
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            px: 5,
            py: 5,
          }}
          variant='elevation'
          elevation={0}
        >
          <CardHeader
            title={
              <Typography variant='h6' component='h2' gutterBottom>
                Comments
              </Typography>
            }
          />

          <CardContent>
            <CommentTree commentsIds={kids} />
          </CardContent>
        </Card>
      )}
    </>
  );
};
