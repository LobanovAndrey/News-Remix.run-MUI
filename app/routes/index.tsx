import { useLoaderData, useNavigate } from '@remix-run/react';

import { json, LoaderFunction } from '@remix-run/server-runtime';
import {
  Card,
  CardContent,
} from '@mui/material';
import { fetchAllPostId } from 'models/news.service';
import invariant from 'tiny-invariant';
import { NewsList } from 'src/components/NewsList/NewsList';
import { useEffect, useState } from 'react';

type LoaderData = {
  ids: number[];
};

export const loader: LoaderFunction = async () => {
  const ids = await fetchAllPostId();

  invariant(ids, 'newsIds is required');
  return json<LoaderData>({ ids });
};

export default function Index() {
  const { ids } = useLoaderData() as LoaderData;

  const [postIds, setPostIds] = useState(ids);
  const navigate = useNavigate();

  useEffect(() => setPostIds(ids), [ids]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        console.log('UPDATE');
        navigate('/');
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card elevation={0} >
      <CardContent sx={{ my: 4, height: '80vh' }}>
        <NewsList key={ids[0]} newsIds={postIds} />
      </CardContent>
    </Card>
  );
}
