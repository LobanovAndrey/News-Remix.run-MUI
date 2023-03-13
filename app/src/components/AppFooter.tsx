import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

export const AppFooter = () => {
  return (
    <Typography
      sx={{ py: 2 }}
      variant='body2'
      color='text.secondary'
      align='center'
    >
      {'Copyright © '}
      <Link color='inherit' href='https://news.ycombinator.com/news'>
        Hacker News
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};
