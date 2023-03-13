export type PostType = "job" | "story" | "comment" | "poll" | "pollopt";

export interface IPost {
  id: number,
  deleted?: boolean,
  type: PostType,
  by: string,

  // Creation date of the item, in Unix Time.
  time: number,
  
  text?: string,
  dead?: boolean,
  parent?: number,
  poll?: any,

  // The ids of the item's comments, in ranked display order.
  kids?: number[],

  url?: string,
  score?: number,
  title?: string,
  parts?: any,

  // In the case of stories or polls, the total comment count.
  descendants?: number,
}

export type PostsIds = number[];