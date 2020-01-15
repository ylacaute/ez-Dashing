import React from 'react';
import {GithubLink} from "Doc/github-link";

/**
 * Doc Page Template
 */
export function DocsContainer({context, children}) {
  const {githubLink} = context.parameters;
  const filePath = githubLink ? githubLink : "/";

  return (
    <>
      <GithubLink filePath={filePath} />
      {children}
    </>
  );
}
