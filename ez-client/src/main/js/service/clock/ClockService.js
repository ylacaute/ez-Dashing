
export const ClockActionType = {
  ClockTick: 'CLOCK_TICK'
};

const DEFAULT_PROPS = {
  milliseconds: 1000,
  tickCount: 0
};

export class ClockService {

  constructor(props = DEFAULT_PROPS) {
    this.props = Object.assign({}, DEFAULT_PROPS, props);
  };

  setDispatch(dispatch) {
    this.dispatch = dispatch;
  }

  start() {
    this.timer = setInterval(this.tick.bind(this), this.props.milliseconds);
  };

  tick() {
    this.dispatch({
      type: ClockActionType.ClockTick,
      date: new Date(),
      tickCount: ++this.props.tickCount
    });
  };

  stop() {
    clearInterval(this.timer);
  };

}




