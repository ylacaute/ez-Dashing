import React from 'react';
import {GithubLink} from "Doc/github-link";
import ReactHtmlParser from 'react-html-parser';
import Resizable from "Doc/resizable";
import "./canvas-container.scss"

export function CanvasContainer({story, context}) {
  const {info, docs, className, width, height} = context.parameters;
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
      <Resizable className={className} width={width} height={height}>
        {story}
      </Resizable>
      <p>{infoMsg}</p>
      <p>{knobsMsg}</p>
    </div>
  );
}
