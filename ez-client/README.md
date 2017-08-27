
#Work in progress...

Current work: graph widget

Which lib to use ?

 - responsive (on DOM element resize, not on window viewport resize)
 - SVG, because there is no CSS direct customization with canva (even if with React we can read SCSS file and finaly mimic the same behaviour)

I didnt't tested all, maybe I will

|Framework     |Type |React integration   |Doc/Samples|Animation      |True responsive  
|--------------|-----|--------------------|-----------|---------------|---------------
|Chartist-js   |SVG  |With react-chartist |Good       |Fail to use it |Yes, but not auto detect ?
|D3            |SVG  |With rd3            |Bad        |               |
|React-vis (d3)|Both |Bad                 |           |               |Yes, but not auto detect ?
|ChartJS       |Canva|With react-chartjs-2|           |               |
|Highcharts    |SVG  |Bad                 |           |               |
|Google Charts |SVG  |Bad                 |           |               |  
|Rumble        |SVG  |Bad                 |Good       |               |

None of these seems to integrate well with React...

 - Chartist: http://gionkunz.github.io/chartist-js/examples.html 
 - rd3: https://yang-wei.github.io/rd3/docs/new/responsiveCharts.html
 - Rumble: https://rumble-charts.github.io/rumble-charts/#Animate
