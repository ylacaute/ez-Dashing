import React from 'react';
import cn from "classnames";
import {GithubLink} from "github-link";

import "./canvas-container.css"

export function CanvasContainer({story, context}) {
  const {layout, info, docs} = context.parameters;
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
    infoMsg = info.map((line, idx) => {
      return (
        <span key={idx}>
          {line} <br/>
        </span>
      );
    });
  }
  if (docs && docs.disable === true) {
    knobsMsg = "You can play with properties in the Knobs tab below.";
  }

  /**
   * Canvas TAB: we display the story in container, with the layout given in parameter
   */
  return (
    <div className="ez-canvas">
      <GithubLink filePath="/"/>
      <div className={cn("ez-story-wrapper", layout)}>
        {story}
      </div>
      {layout === "widget" &&
        <p>This component is wrapped in a 200x200px container.</p>
      }
      <p>{infoMsg}</p>
      <p>{knobsMsg}</p>
    </div>
  );
}
