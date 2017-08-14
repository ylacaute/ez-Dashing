import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';
import LinearProgressBar from 'component/chart/LinearProgressBar.jsx';
import AvatarConfig from 'config/AvatarConfig';
import ScalableImage from 'component/scalable/ScalableImage.jsx';

class SonkinsWidget extends AbstractWidget {

  static propTypes = {
    status: PropTypes.string,
    author: PropTypes.string
  };

  static defaultProps = {
    status: 'UNKNOWN',
    author: ''
  };


  /*

  textForValue={textForValue}
        classForValue={(val) => ThresholdConfig.get(this.props.thresholds.memoryUsage, val)}
        displayValuePosition={displayValuePosition}


        <LinearProgressBar
          label="Memory"
          value={85}
          textForValue={(value) => `Coverage: ${value}%`}
        />


   */
  renderContent() {

    let avatar = AvatarConfig.get(this.props.jenkinsAuthor, this.props.avatars);
//<ScalableImage src={avatar.url}/>
    console.log("FUCKIGN AVATAR : ", avatar);
    return (
      <div>
        <div className="metric image">
          <div>
            <div className="value">
              <img
                draggable="false"
                src={avatar.url}
              />
            </div>
            <div className="name">Last build</div>
          </div>
        </div>
        <div className="metric">
          <div>
            <div className="value">45k</div>
            <div className="name">Lines</div>
          </div>
        </div>
        <div className="metric">
          <div>
            <div className="value">45</div>
            <div className="name">Violations</div>
          </div>
        </div>
        <div className="metric">
          <div>
            <div className="value">67.8%</div>
            <div className="name">Coverage</div>

          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
};


export default connect(mapStateToProps)(SonkinsWidget)
