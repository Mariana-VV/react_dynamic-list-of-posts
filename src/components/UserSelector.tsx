import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';
import { Post } from '../types/Post';
// import { Comment } from '../types/Comment';

type Props = {
  users: User[];
  setCurrentUser: (user: User | null) => void;
  currentUser?: User | null;
  setCurrentPost: (post: Post | null) => void;
  setPosts: (posts: Post[]) => void;
  // setComments: (comments: Comment[]) => void;
  onSubmit: (user: User | null | undefined) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  setCurrentUser,
  currentUser,
  setPosts,
  setCurrentPost,
  onSubmit,
}) => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  function handleDropdownClick(): void {
    setIsMenuShown(true);
  }

  function handleUserClick(user: User) {
    setCurrentPost(null);
    setPosts([]);
    setCurrentUser(user);

    onSubmit(user);

    setIsMenuShown(false);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isMenuShown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleDropdownClick}
          onBlur={() => setIsMenuShown(false)}
        >
          <span>{currentUser ? currentUser?.name : 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': currentUser === user,
              })}
              onClick={() => {
                handleUserClick(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
