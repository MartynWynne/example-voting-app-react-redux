import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import TotalVotes from './TotalVotes';
import Choices from './Choices';


class Results extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="higher">
                <div id="background-stats">
                    <div id="background-stats-1" style={{width: this.props.aPercent + "%"}}></div>
                    <div id="background-stats-2" style={{width: this.props.bPercent + "%"}}></div>
                </div>
                <div id="content-container">
                    <div id="content-container-center">
                        <Choices aPercent={this.props.aPercent} bPercent={this.props.bPercent} />
                    </div>
                </div>
                <div id="result">
                    <TotalVotes total={this.props.total} />
                </div>
            </div>
        );
    }
}
Results.propTypes = {
    aPercent: React.PropTypes.number.isRequired,
    bPercent: React.PropTypes.number.isRequired,
    total: React.PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Results);