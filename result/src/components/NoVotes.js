import React, {PropTypes} from 'react';

class NoVote extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <span>No votes yet</span>;
    }
}

NoVote.propTypes = {
    total: React.PropTypes.number.isRequired
};

export default NoVote;