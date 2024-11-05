/* eslint-disable prettier/prettier */
import * as dataFromServer from './api/users';

import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const [currentPost, setCurrentPost] = useState<Post | null | undefined>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentLoading, setCommentLoading] = useState(false);
  const [isPostLoaded, setIsPostLoaded] = useState(false);
  const [isPostLoadError, setIsPostLoadError] = useState(false);
  const [isCommentLoadError, setIsCommentLoadError] = useState(false);
  const [isLoadedByAddComment, setIsLoadedByAddComment] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);


  const getCommentsByCurrentPost = (post: Post) => {
    setIsCommentLoadError(false);
    setCommentLoading(true);
    dataFromServer
      .getCommentsByPost(post?.id)
      .then(setComments)
      .catch(()=>setIsCommentLoadError(true))
      .finally(() => setCommentLoading(false));
  };

  const getPostsByCurrentUser = (user?: User | null | undefined) => {
    setIsPostLoadError(false);
    setIsPostLoaded(true);

    dataFromServer
      .getPostsByUser(user?.id)
      .then(setPosts)
      .catch(() => setIsPostLoadError(true))
      .finally(() => setIsPostLoaded(false));
  };

  useEffect(() => {
    dataFromServer.getUsers().then(setUsers);
  }, []);

  const addComment = (comment: Comment) => {
    setIsLoadedByAddComment(true);

    dataFromServer
      .addComment(comment)
      .then(() => setComments([...comments, comment]))
      .finally(() => setIsLoadedByAddComment(false));
  };

  const deleteComment = (commentId: number) => {
    dataFromServer
      .deleteComment(commentId)
      .then(() =>
        setComments(prevComments =>
          prevComments.filter(c => c.id !== commentId),
        ),
      );
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                  setCurrentPost={setCurrentPost}
                  onSubmit={getPostsByCurrentUser}
                  setPosts={setPosts}

                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {isPostLoaded && <Loader />}

                {isPostLoadError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser &&
                  posts.length === 0 &&
                  !isPostLoaded &&
                  !isPostLoadError && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >No posts yet
                  </div>
                )}

                {currentUser && posts.length !== 0 && (
                  <PostsList
                    posts={posts}
                    setCurrentPost={setCurrentPost}
                    currentPost={currentPost}
                    getCommentsByCurrentPost={getCommentsByCurrentPost}
                    openForm={setIsOpenForm}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              { 'Sidebar--open': currentPost },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails
                  currentPost={currentPost}
                  comments={comments}
                  isLoading={isCommentLoading}
                  onSubmit={addComment}
                  deleteComment={deleteComment}
                  isLoadedByAddComment={isLoadedByAddComment}
                  isCommentLoadError={isCommentLoadError}
                  setIsFormOpen={setIsOpenForm}
                  isFormOpen={isOpenForm}

                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
