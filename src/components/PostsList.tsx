import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  setCurrentPost: (post: Post | null) => void;
  currentPost?: Post | null;
  getCommentsByCurrentPost: (post: Post) => void;
  openForm?: (isOpen: boolean) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setCurrentPost,
  currentPost,
  getCommentsByCurrentPost,
  openForm,
}) => (
  <div data-cy="PostsList">
    <p className="title">Posts:</p>

    <table className="table is-fullwidth is-striped is-hoverable is-narrow">
      <thead>
        <tr className="has-background-link-light">
          <th>#</th>
          <th>Title</th>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {posts.map(post => (
          <PostItem
            post={post}
            key={post.id}
            setCurrentPost={setCurrentPost}
            currentPost={currentPost}
            getCommentsByCurrentPost={getCommentsByCurrentPost}
            openForm={openForm}
          />
        ))}
      </tbody>
    </table>
  </div>
);
