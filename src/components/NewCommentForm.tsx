import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  onSubmit: (comment: Comment) => void;
  currentPost?: Post | null | undefined;
  isLoadedByAddComment: boolean;
  isCommentLoadError: boolean;
};

export const NewCommentForm: React.FC<Props> = ({
  onSubmit,
  currentPost,
  isLoadedByAddComment,
  isCommentLoadError,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (nameError) {
      setNameError(false);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (emailError) {
      setEmailError(false);
    }
  };

  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    if (messageError) {
      setMessageError(false);
    }
  };

  const onClearClick = () => {
    setName('');
    setEmail('');
    setMessage('');
    if (messageError) {
      setMessageError(false);
    }

    if (emailError) {
      setEmailError(false);
    }

    if (nameError) {
      setNameError(false);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setNameError(true);
    }

    if (!email.trim()) {
      setEmailError(true);
    }

    if (!message.trim()) {
      setMessageError(true);
    }

    if (name.trim() && email.trim() && message.trim()) {
      const newComment: Comment = {
        id: 0,
        postId: currentPost?.id || 0,
        name: name.trim(),
        email: email.trim(),
        body: message.trim(),
      };

      onSubmit(newComment);
    }

    if (!isCommentLoadError) {
      setMessage('');
    }
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleFormSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={name}
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': nameError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p
            className={classNames('help', { 'is-danger': nameError })}
            data-cy="ErrorMessage"
          >
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            value={email}
            type="email"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className={classNames('icon is-small is-right', {
                'has-text-danger': emailError,
              })}
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p
            className={classNames('help', { 'is-danger': emailError })}
            data-cy="ErrorMessage"
          >
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            value={message}
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': messageError })}
            onChange={handleMessageChange}
          />
        </div>

        {messageError && (
          <p
            className={classNames('help', { 'is-danger': messageError })}
            data-cy="ErrorMessage"
          >
            {/* help is-danger */}
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', {
              'is-loading': isLoadedByAddComment,
            })}

            //
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={onClearClick}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
