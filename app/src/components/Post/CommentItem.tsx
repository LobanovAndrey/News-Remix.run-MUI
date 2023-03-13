import { Box, Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { convert } from 'html-to-text';
import { format } from 'date-fns';

interface CommentItemProps {
  author: string;
  timestamp: number;
  text: string;
  replies?: number;
}

export const CommentItem: FC<CommentItemProps> = ({
  author,
  timestamp,
  text,
  replies,
}) => {
  return (
    <Card sx={{pt: 3, px:1}} variant='elevation' elevation={0}>
      <Stack spacing={2} direction='row' alignItems='center'>
        <Typography fontWeight='bold' sx={{ color: 'neutral.darkBlue' }}>
          {author}
        </Typography>
        <Typography sx={{ color: 'neutral.grayishBlue' }}>
          {format(new Date(timestamp * 1000), 'd MMM yyyy HH:mm')}
        </Typography>

        {replies && (
          <Typography sx={{ color: 'neutral.grayishBlue' }}>
            {replies} replies
          </Typography>
        )}
      </Stack>

      <Typography sx={{ color: 'neutral.grayishBlue', p: '20px 0' }}>
        {convert(text)}
      </Typography>
    </Card>
  );
};
