import React from 'react';
import cn from "classnames";
import {GithubLink} from "Doc/github-link";
import ReactHtmlParser from 'react-html-parser';

import "./canvas-container.scss"

export function CanvasContainer({story, context}) {
  const {info, docs, className} = context.parameters;

  const style = {};
  if (context.parameters.width) {
    style.width = context.parameters.width;
  }
  if (context.parameters.height) {
    style.height = context.parameters.height;
  }
  const queryParams = (new URL(document.location)).searchParams;
  const isDocs = queryParams.get("viewMode") === "docs";
  let infoMsg = null;
  let knobsMsg = null;

  /**
   * Docs TAB: we display the story depending on the MDX
   */
  if (isDocs) {
    return story;
  }

  if (info) {
    infoMsg = ReactHtmlParser(info);
  }

  /**
   * Canvas TAB: we display the story in container, with the layout given in parameter
   */
  return (
    <div className="ez-canvas">
      <GithubLink filePath="/"/>
      <div
        className={cn("ez-story-wrapper", className)}
        style={style}
      >
        {story}
      </div>
      <p>{infoMsg}</p>
      <p>{knobsMsg}</p>
    </div>
  );
}
