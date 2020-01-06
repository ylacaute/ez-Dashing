import React from 'react';
import {storiesOf} from '@storybook/react';
import {array, object, text} from "@storybook/addon-knobs";

import BugWidget from "./bug-widget";

storiesOf('Widget|Bug', module)
  .addParameters({
    component: BugWidget,
    componentSubtitle: 'A BugWidget',
  })
  .add('default', () =>
    <BugWidget
      id="id"
      key="key"
      title="Default BugWidget"
      loader={<p>Widget loading...</p>}
      dataSource={[]}
    />
  )
  .add('editable', () =>
    <BugWidget
      id={text("id", "sampleId")}
      key={text("key", "sampleId")}
      title={text("title", "Play with me (Canvas tab)")}
      loader={object("loader", <p>Widget loading...</p>)}
      showModal={() => {}}
      dataSource={array("datasource", [])}
    />);
