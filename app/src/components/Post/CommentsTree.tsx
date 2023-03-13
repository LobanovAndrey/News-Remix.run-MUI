import { fetchPostsDataByIds } from 'models/news.service';
import { FC, useCallback, useEffect, useState } from 'react';
import { IPost } from 'models/news.interfaces';
import { CommentItem } from './CommentItem';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import { TransitionProps } from '@mui/material/transitions';

interface CommentTreeProps {
  commentsIds: number[];
}

type NumberOrString = string | number;

type RenderTreeItem = {
  id: NumberOrString;
  data: IPost;
  childrenIds?: number[];
};

type TreeChildrensMapType = {
  [key: NumberOrString]: number[];
};

type RenderTreeType = {
  [key: NumberOrString]: RenderTreeItem[];
};

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
    marginTop: -45,
    '& svg': {
      fontSize: '22 px !important',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 37,
    paddingLeft: 0,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .MuiTreeItem-content:hover`]: {
    backgroundColor: 'transparent',
  },
  [`& .MuiTreeItem-root:hover`]: {
    backgroundColor: 'transparent',
  },
  ['& .MuiTreeItem-content.Mui-focused, & .MuiTreeItem-content.Mui-selected, & .MuiTreeItem-content.Mui-selected.Mui-focused']: {
    backgroundColor: 'transparent',
  },
  ['& .Mui-focused, & .Mui-selected, & .Mui-selected.Mui-focused']: {
    backgroundColor: 'transparent',
  },
}));

export const CommentTree: FC<CommentTreeProps> = ({ commentsIds }) => {
  const [tree, setTree] = useState<RenderTreeType>({
    root: [] as RenderTreeItem[],
  });
  const [treeChildrensMap, setTreeChildrensMap] =
    useState<TreeChildrensMapType>();

  const updateTreeState = useCallback((newPosts: IPost[], nodeId?: string) => {
    const updatedComments: RenderTreeItem[] = [];
    const updatedChildrenMap: TreeChildrensMapType = {};

    newPosts.forEach((post) => {
      updatedComments.push({
        id: post.id,
        data: post,
        childrenIds: post.kids,
      });

      if (post.kids && post.kids.length > 0) {
        updatedChildrenMap[post.id] = post.kids;
      }
    });

    setTree((prev) => ({
      ...prev,
      [nodeId ? nodeId : 'root']: updatedComments,
    }));

    setTreeChildrensMap((prev) => ({ ...prev, ...updatedChildrenMap }));
  }, []);

  useEffect(() => {
    fetchPostsDataByIds(commentsIds).then((comments) => {
      comments && updateTreeState(comments);
    });
  }, [commentsIds, updateTreeState]);

  const handleChange = useCallback(
    (event: any, nodeIds: string[]) => {
      if (treeChildrensMap && treeChildrensMap[nodeIds[0]]) {
        fetchPostsDataByIds(treeChildrensMap[nodeIds[0]]).then((posts) => {
          posts && updateTreeState(posts, nodeIds[0]);
        });
      }
    },
    [treeChildrensMap, updateTreeState]
  );

  const renderTree = (children: RenderTreeItem[]) => {
    return children.map((child) => {
      let childNodes;
      if (tree[child.id] && tree[child.id].length > 0) {
        childNodes = renderTree(tree[child.id]);
      } else {
        childNodes = child.childrenIds ? [<div key={child.id} />] : null;
      }

      return (
        <StyledTreeItem
          key={child.id}
          nodeId={child.id.toString()}
          sx={{pointerEvents: child.childrenIds ? '' : 'none'}}
          label={
            <CommentItem
              author={child.data.by}
              text={child.data.text ?? ''}
              timestamp={child.data.time}
              replies={child.data.kids?.length}
            />
          }
        >
          {childNodes}
        </StyledTreeItem>
      );
    });
  };

  return (
    <TreeView
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      onNodeToggle={handleChange}
      multiSelect={false}
      disableSelection
      disabledItemsFocusable
      sx={{
        '& .MuiTreeItem-content .MuiTreeItem-iconContainer svg': {
          fontSize: 22,
        }
      }}
    >
      {renderTree(tree.root)}
    </TreeView>
  );
};
