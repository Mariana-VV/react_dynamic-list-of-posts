import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';
import { Comment } from '../types/Comment';

type Props = {
  currentPost?: Post | null | undefined;
  comments: Comment[];
  isLoading: boolean;
  onSubmit: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
  isLoadedByAddComment: boolean;
  isCommentLoadError: boolean;
};

export const PostDetails: React.FC<Props> = ({
  currentPost,
  comments,
  isLoading,
  onSubmit,
  deleteComment = () => {},
  isLoadedByAddComment,
  isCommentLoadError,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleWriteCommentClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">{currentPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isCommentLoadError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && comments.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoading &&
            comments.length &&
            comments.map(
              comment =>
                comment !== null && (
                  <CommentItem
                    comment={comment}
                    key={comment.id}
                    deleteComment={deleteComment}
                  />
                ),
            )}

          {!isLoading && !isFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && (
          <NewCommentForm
            onSubmit={onSubmit}
            currentPost={currentPost}
            isLoadedByAddComment={isLoadedByAddComment}
          />
        )}
      </div>
    </div>
  );
};
