import { Container } from '@mui/material';
import { IPost } from 'models/news.interfaces';
import { fetchPostsDataByIds } from 'models/news.service';
import { FC, useCallback, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import NewsItem from './NewsItem';
import AutoSizer from 'react-virtualized-auto-sizer';
import { asyncThrottle } from 'src/utils';

interface NewsListProps {
  newsIds: number[];
}

const ListContainer = (props: any) => {
  return <Container maxWidth='sm' sx={{ position: 'reletaive' }} {...props} />;
};

export const NewsList: FC<NewsListProps> = ({ newsIds }) => {
  const [data, setData] = useState<IPost[]>([]);

  const fetchMoreItems = useCallback(
    (startIndex: number, stopIndex: number) =>
      fetchPostsDataByIds(newsIds.slice(startIndex, stopIndex)),
    [newsIds]
  );

  const asyncThrottleFetch = useCallback(asyncThrottle(fetchMoreItems, 3000), [
    asyncThrottle,
    fetchMoreItems,
  ]);

  const loadMoreItems = useCallback((startIndex: number, stopIndex: number) => {
    asyncThrottleFetch(startIndex, stopIndex).then((posts) => {
      posts && setData((prev) => [...prev, ...posts]);
    });
  }, [asyncThrottleFetch]);

  // TODO: implements dymanic size
  const getItemSize = useCallback((index: number) => 115, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={(index) => !!data[index]}
          itemCount={newsIds.length}
          loadMoreItems={loadMoreItems}
          minimumBatchSize={30}
          threshold={15}
        >
          {({ onItemsRendered, ref }) => (
            <List
              className='List'
              height={height}
              width={width}
              itemCount={newsIds.length}
              itemSize={getItemSize}
              itemData={{ posts: data }}
              innerElementType={ListContainer}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {NewsItem}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  );
};
