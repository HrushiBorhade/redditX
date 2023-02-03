import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Post = {
  id?:string;
  communityId: string;
  communityImageURL?: string;
  creatorDisplayName: string; 
  creatorId: string;
  title: string;
  body: string;
  numberOfComments: number;
  voteStatus: number;
  imageURL?: string;
  createdAt: Timestamp;
};

export type PostVote = {
  id: string;
  postId: string;
  communityId: string;
  voteValue: number;
};

interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
}

export const defaultPostState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
};

export const postState = atom({
  key: "postState",
  default: defaultPostState,
});
