import { IPost, PostsIds } from 'models/news.interfaces';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const STORIES_IDS_URL = 'newstories.json';

const MAX_NEWS_COUNT = 100;

export const fetchAllPostId = async () => {
  try {
    const response = await fetch(BASE_URL + STORIES_IDS_URL);

    if (response.status !== 200) {
      throw new Error(
        `Cant fetch all news ids. Status code: ${response.status}`
      );
    }
    const postsIds: PostsIds = await response.json();

    return postsIds;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchPostsDataByIds = async (
  postIds: PostsIds,
) => {
  try {
    const results = await Promise.allSettled(
      postIds.map((id) => getPostById(id))
    );

    const posts = results.reduce((acc, item) => {
      if (item && item.status === 'fulfilled' && item.value && acc) {
        return [...acc, item.value];
      }
    }, [] as IPost[] | undefined);

    return posts;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getPostById = async (id: string | number) => {
  try {
    const response = await fetch(BASE_URL + 'item/' + id + '.json');

    if (response.status !== 200) {
      throw new Error(
        `ERROR!: Cant fetch news by Id. Status code: ${response.status}`
      );
    }

    const item: IPost = await response.json();
    return item;
  } catch (e) {
    console.error(e);
    return null;
  }

};