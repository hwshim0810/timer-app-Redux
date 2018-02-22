import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators as appActions } from '../../reducer';
import Timer from './presenter';


function mapStateToProps(state) {
    const { isPlaying, elapsedTime, timerDuration } = state;

    return {
        isPlaying,
        elapsedTime,
        timerDuration
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startTimer: bindActionCreators(appActions.startTimer, dispatch),
        restartTimer: bindActionCreators(appActions.restartTimer, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);