import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class Choices extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div id="choice">
                <div className="choice cats">
                    <div className="label">Cats</div>
                    <div className="stat">{this.props.aPercent}%</div>
                </div>
                <div className="divider"></div>
                <div className="choice dogs">
                    <div className="label">Dogs</div>
                    <div className="stat">{this.props.bPercent}%</div>
                </div>
            </div>
        );
    }
}

Choices.propTypes = {
    aPercent: React.PropTypes.number.isRequired,
    bPercent: React.PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Choices);