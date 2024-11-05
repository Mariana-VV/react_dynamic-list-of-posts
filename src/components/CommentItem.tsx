import { Comment } from '../types/Comment';

type Props = {
  comment: Comment;
  deleteComment: (commentId: number) => void;
};

export const CommentItem: React.FC<Props> = ({ comment, deleteComment }) => {
  const { name, email, body, id } = comment;
  const handleCommentDeleteClick = () => {
    deleteComment(id);
  };

  return (
    <article className="message is-small" data-cy="Comment">
      <div className="message-header">
        <a href={`mailto:${email}`} data-cy="CommentAuthor">
          {name}
        </a>
        <button
          data-cy="CommentDelete"
          type="button"
          className="delete is-small"
          aria-label="delete"
          onClick={handleCommentDeleteClick}
        ></button>
      </div>

      <div className="message-body" data-cy="CommentBody">
        {body}
      </div>
    </article>
  );
};
