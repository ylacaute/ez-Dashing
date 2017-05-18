import React from 'react';
import AbstractWidget from 'js/widget/AbstractWidget.jsx';

class ClockWidget extends AbstractWidget {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    /*if (this.props.UTCOffset == null) {
      this.props.UTCOffset = "+2"
    }*/
    this.setTime();
  }

  componentDidMount() {
    window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);

    //var elt = document.getElementById('clock');
/*
    document.body.setScaledFont = function (f) {
      var s = this.offsetWidth, fs = s * f;
      var elt = document.getElementById('clock');
      elt.style.fontSize = fs + '%';
      return this
    };*/

   /* console.log("CLOCK RESIZE", elt);

    elt.onresize = function() {
      console.log('resized');
    };
*/
    /*
    window.onresize = function() {
      document.body.setScaledFont(0.35);
    };
*/
    /*
    function resizeFont(elemToR){
      parentW = elemToR.width();
      elemToR.find('.row').each(function(n){
        curRow = $(this);
        curWidth = curRow.width();
        console.log(curWidth)
        console.log(parentW)
        var ratio = parentW / curWidth;
        console.log(ratio)
        $(this).css(‘font-size’, ratio * initialSize + ‘px’);
      });
    }*/

  }




  setTime() {
    var now = new Date();
    var hours = now.getUTCHours() + parseInt(this.props.UTCOffset);

    // correct for number over 24, and negatives
    if (hours >= 24 ) {
      hours -= 24;
    }
    if (hours < 0) {
      hours += 12;
    }

    // add leading zero, first convert hours to string
    hours = hours + "";
    if (hours.length == 1) {
      hours = "0" + hours;
    }

    // minutes are the same on every time zone
    var minutes = now.getUTCMinutes();

    // add leading zero, first convert hours to string
    minutes = minutes + "";
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }

    var seconds = now.getUTCSeconds();
    //console.log(hours, minutes, seconds);

    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  }

  render() {

    return (
      <div className="clock-widget widget">
        <div id="clock">{this.state.hours}:{this.state.minutes}:{this.state.seconds}</div>
      </div>
    );
  }
}



//document.body.setScaledFont(0.35);


export default ClockWidget;
