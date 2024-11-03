import { Post } from '../types/Post';

type Props = {
  post: Post;
  setCurrentPost: (post: Post | null) => void;
  currentPost?: Post | null;
  getCommentsByCurrentPost: (post: Post) => void;
  openForm: (isOpen: boolean) => void;
};

export const PostItem: React.FC<Props> = ({
  post,
  setCurrentPost,
  currentPost,
  getCommentsByCurrentPost,
  openForm,
}) => {
  const handleOpenPostClick = () => {
    setCurrentPost(null);
    openForm(false);

    getCommentsByCurrentPost(post);

    setCurrentPost(post);
  };

  const handleClosePostClick = () => {
    setCurrentPost(null);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      {currentPost !== post && (
        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link is-light"
            onClick={handleOpenPostClick}
          >
            Open
          </button>
        </td>
      )}

      {currentPost === post && (
        <td className="has-text-right is-vcentered">
          <button
            type="button"
            data-cy="PostButton"
            className="button is-link"
            onClick={handleClosePostClick}
          >
            Close
          </button>
        </td>
      )}
    </tr>
  );
};
