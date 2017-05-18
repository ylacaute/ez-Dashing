import React from 'react';
import {render} from 'react-dom';
import DynGrid from 'js/dynGrid.jsx';
//import DynGridSample from 'js/dynGridSample.jsx';
//import Todo from 'js/component/todo/Todo.jsx';

// STYLE
import Style from 'sass/main.scss';
import ReactGridLayoutStyle from 'react-grid-layout/css/styles.css';
import ReactGridResizableStyle from 'react-resizable/css/styles.css';

import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <DynGrid>

        </DynGrid>
      </div>
    );
  }
}

render(<App/>, document.getElementById('react-app'));
