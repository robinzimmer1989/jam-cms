import React from 'react';
import { Link } from 'gatsby';
import { RichText } from 'jam-cms';

// import app components
import Github from '../../icons/github.svg';

const Footer = (props) => {
  const { text, email, phone, address, github, footermenu } = props;

  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a href="/" aria-label="Go home" title="Company" className="inline-flex items-center">
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Company
            </span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            {text && (
              <div className="prose">
                <RichText>{text}</RichText>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-gray-900">Contacts</p>
          {phone && (
            <div className="flex">
              <p className="mr-1 text-gray-800">Phone:</p>
              <a
                href={`tel:${phone}`}
                aria-label="Our phone"
                title="Our phone"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                {phone}
              </a>
            </div>
          )}
          {email && (
            <div className="flex">
              <p className="mr-1 text-gray-800">Email:</p>
              <a
                href={`mailto:${email}`}
                aria-label="Our email"
                title="Our email"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                {email}
              </a>
            </div>
          )}
          {address && (
            <div className="flex">
              <p className="mr-1 text-gray-800">Address:</p>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Our address"
                title="Our address"
                className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
              >
                {address}
              </a>
            </div>
          )}
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-gray-900">Social</span>
          {github && (
            <div className="flex items-center mt-1 space-x-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <Github />
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright {new Date().getFullYear()}. All rights reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          {footermenu &&
            footermenu.map((o, i) => {
              return (
                <li key={i}>
                  <Link
                    to={o.url}
                    className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    {o.title}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
