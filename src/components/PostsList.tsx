import React from 'react';
import { Post } from '../types/Post';
import { PostItem } from './PostItem';

type Props = {
  posts: Post[];
  setCurrentPost: (post: Post | null) => void;
  currentPost?: Post | null;
  getCommentsByCurrentPost: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setCurrentPost,
  currentPost,
  getCommentsByCurrentPost,
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
          />
        ))}
      </tbody>
    </table>
  </div>
);

/*
 <tr data-cy="Post">
          <td data-cy="PostId">17</td>

          <td data-cy="PostTitle">
            fugit voluptas sed molestias voluptatem provident
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link is-light"
            >
              Open
            </button>
          </td>
        </tr>

        <tr data-cy="Post">
          <td data-cy="PostId">18</td>

          <td data-cy="PostTitle">
            voluptate et itaque vero tempora molestiae
          </td>

          <td className="has-text-right is-vcentered">
            <button
              type="button"
              data-cy="PostButton"
              className="button is-link"
            >
              Close
            </button>
          </td>
        </tr>
*/
