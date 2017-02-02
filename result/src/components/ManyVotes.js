import React, {PropTypes} from 'react';

class ManyVote extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <span>{this.props.total} votes</span>;
    }
}

ManyVote.propTypes = {
    total: React.PropTypes.number.isRequired
};

export default ManyVote;