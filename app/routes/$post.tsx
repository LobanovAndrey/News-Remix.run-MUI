import type { LoaderFunction } from '@remix-run/server-runtime';
import { json } from '@remix-run/server-runtime';
import { useLoaderData } from 'react-router';
import invariant from 'tiny-invariant';
import { getPostById } from 'models/news.service';
import { IPost } from 'models/news.interfaces';
import { Post } from 'src/components/Post/Post';

type LoaderData = {
  post: IPost;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { post: id } = params;
  invariant(id, 'postId is required');

  const post = await getPostById(id);
  invariant(post, `News is not found: ${id}`);

  return json<LoaderData>({ post });
};

export const PostRoute = () => {
  const { post } = useLoaderData() as LoaderData;

  return (
    <Post {...post} />
  );
};

export default PostRoute;
