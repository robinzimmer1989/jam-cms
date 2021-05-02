import React from 'react';
import { Link } from 'gatsby';

const Button = (props) => {
  const { url, title, variant } = props;

  if (!url || !title) {
    return null;
  }

  let className = '';

  if (variant === 'filled') {
    className =
      'inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-primaryContrast transition duration-200 rounded shadow-md bg-primary hover:opacity-50 focus:shadow-outline focus:outline-none';
  } else if (variant === 'text') {
    className =
      'inline-flex items-center font-semibold transition-colors duration-200 text-primary hover:underline';
  }

  return url.includes('http') ? (
    <a
      href={url}
      className={className}
      children={title}
      title={title}
      aria-label={title}
      target={'_blank'}
      rel="noopener noreferrer"
    />
  ) : (
    <Link to={url} className={className} children={title} />
  );
};

export default Button;
