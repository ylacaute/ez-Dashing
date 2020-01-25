import React from "react";
import PropTypes from "prop-types";
import Widget from "component/widget/base/widget";
import WidgetContent from "component/widget/base/widget-content";
import WidgetHeader from "component/widget/base/widget-header";
import VelocityCalculator from "utils/velocity-calculator";
import DateService from "service/date/date-service";
import {ResponsiveLine} from "@nivo/line";
import Logger from 'utils/logger';
import {darkChartTheme} from "style/theme/dark-chart-theme";
import cn from "classnames";

import "./burndown-chart-widget.scss";

const yAxisFormatter = (value, idx) => {
  return `${value} SP`
};

const xAxisFormatter = (value, idx) => {
  return value;
};

const toChartValues = (val) => ({
  x: val.date,
  y: val.storyPoints
});

const logger = Logger.getLogger("BurndownChartWidget");

export default class BurndownWidget extends React.PureComponent {

  static propTypes = Object.assign({
    dateTickCount: PropTypes.number,
    sprintId: PropTypes.string.isRequired,
    sprintName: PropTypes.string.isRequired,
    sprintNumber: PropTypes.number.isRequired,
    sprintStartDate: PropTypes.instanceOf(Date).isRequired,
    sprintEndDate: PropTypes.instanceOf(Date).isRequired,
    closedIssues: PropTypes.array.isRequired,
    readyIssues: PropTypes.array.isRequired
  }, Widget.propTypes);

  static defaultProps = {
    title: "BURNDOWN CHART",
    dateTickCount: 10,
    sprintId: "-",
    sprintName: "-",
    sprintNumber: 0,
    sprintStartDate: DateService.now(),
    sprintEndDate: DateService.now(),
    closedIssues: [],
    readyIssues: []
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  static getDerivedStateFromProps(props, state) {
    const {sprintStartDate, sprintEndDate, closedIssues, readyIssues} = props;
    const allSprintIssues = closedIssues.concat(readyIssues);
    if (allSprintIssues.length === 0) {
      return {
        hasError: true,
        error: {
          name: "No JIRA issues",
          message: "Please verify your request configuration"
        }
      };
    }
    return state;
  }

  render() {
    const {className, sprintStartDate, sprintEndDate, closedIssues, readyIssues} = this.props;
    const classNames = cn("burndown", className);
    const now = DateService.now();
    const allSprintIssues = closedIssues.concat(readyIssues);
    const velocity = VelocityCalculator.calculate(
      now,
      sprintStartDate,
      sprintEndDate,
      allSprintIssues);
    const velocityData = [{
      "id": "Planned Velocity",
      "color": "white",
      "enableArea": false,
      "data": velocity.plannedVelocity.map(toChartValues)
    }, {
      "id": "Current Velocity",
      "color": "#2e9bdc",
      "data": velocity.currentVelocity.map(toChartValues)
    }];

    logger.info("velocityData :", velocityData);

    return (
      <Widget
        className={classNames}
        {...this.props}
      >
        <WidgetHeader title={this.props.title}/>
        <WidgetContent>
          <ResponsiveLine
            theme={darkChartTheme}
            data={velocityData}
            margin={{
              top: 50,
              right: 30,
              bottom: 60,
              left: 60
            }}
            xScale={{type: 'point'}}
            yScale={{
              type: 'linear',
              stacked: false,
              min: 0,
              max: 'auto'
            }}
            xFormat={(v) => `${v}`}
            yFormat={(v) => `${v}`}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: 'bottom',
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 45,
              legend: '',
              legendOffset: 60,
              legendPosition: 'middle',
              format: xAxisFormatter
            }}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: '',
              legendOffset: -40,
              legendPosition: 'middle',
              format: yAxisFormatter
            }}
            //colors={{scheme: 'nivo' }}
            colors={d => d.color}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]]
            }}
            lineWidth={1}
            pointSize={3}
            pointColor={{theme: 'background'}}
            pointBorderWidth={2}
            pointBorderColor={{from: 'serieColor'}}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.05}
            useMesh={true}
            legends={[
              {
                color: '#F00',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: -20,
                translateY: -40,
                itemsSpacing: 40,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: '#FF0'
              }
            ]}
          />
        </WidgetContent>
      </Widget>
    )
  }


}
