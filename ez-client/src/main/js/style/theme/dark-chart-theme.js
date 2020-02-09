export const darkChartTheme = {
  background: 'transparent',
  fontFamily: 'sans-serif',
  fontSize: 16,
  textColor: '#777',
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
        strokeWidth: 1
      }
    },
    ticks: {
      line: {
        stroke: '#777',
        strokeWidth: 1
      },
      text: {
        paddingTop: '100px',
        borderSize: '1px',
        borderColor: 'red'
      }
    },
    legend: {
      text: {
        fill: '#555',
        fontSize: 13,
        letterSpacing: '3px',
        textTransform: "uppercase"
      }
    }
  },
  grid: {
    line: {
      stroke: '#444',
      strokeWidth: 1
    }
  },
  legends: {
    slicesLabelsTextColor: "#222",
    text: {
      color: '#777',
      fontStyle: 'italic',
      letterSpacing: '1px'
    }
  },
  labels: {
    text: {}
  },
  markers: {
    lineColor: '#0F0',
    lineStrokeWidth: 1,
    text: {}
  },
  dots: {
    text: {}
  },
  tooltip: {
    container: {
      background: '#444',
      color: 'inherit',
      fontSize: 'inherit',
      borderRadius: '2px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
      padding: '5px 9px'
    },
    basic: {
      whiteSpace: 'pre',
      display: 'flex',
      alignItems: 'center'
    },
    chip: {
      marginRight: 7
    },
    table: {},
    tableCell: {
      background: 'red',
      padding: '3px 5px'
    }
  },
  crosshair: {
    line: {
      stroke: '#eee',
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: '6 6'
    }
  },
  annotations: {
    text: {// Not used
      fontSize: 13,
      outlineWidth: 2,
      outlineColor: '#0FF'
    },
    link: {// Not used
      stroke: '#0F0',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#0F0'
    },
    outline: {// Not used
      fill: '#00F',
      stroke: '#00F',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#00F'
    },
    symbol: {// Not used
      fill: '#FF0',
      outlineWidth: 2,
      outlineColor: '#FF0'
    }
  }
};

