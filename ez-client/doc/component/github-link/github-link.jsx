import React from 'react';
import {string} from "prop-types";
import { GithubIcon } from "./assets";
import "./github-link.css";

const GITHUB_REPOSITORY_URL = "https://github.com/ylacaute/ez-Dashing";

const propTypes = {
  filePath: string.isRequired
};

export function getGithubUrl(filePath) {
  const processedFilePath = filePath.startsWith("/") ? filePath : `/${filePath}`;
  return `${GITHUB_REPOSITORY_URL}${processedFilePath}`;
}

export function GithubLink({filePath}) {
  return (
    <div className="github-icon-wrapper">
      <a href={getGithubUrl(filePath)}
         target="_blank"
         rel="noopener noreferrer"
      >
       <GithubIcon className="github-icon"/>
      </a>
    </div>
  );
}

GithubLink.propTypes = propTypes;
