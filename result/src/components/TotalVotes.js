import React, {PropTypes} from 'react';
import NoVotes from './NoVotes';
import ManyVotes from './ManyVotes';
import OneVote from './OneVote';

class TotalVotes extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const total = this.props.total;
        if (total === 0) {
            return <oVotes />;
        } else if (total === 1) {
            return <OneVote total={total} />;
        } else {
            return <ManyVotes total={total} />;
        }
    }
}

TotalVotes.propTypes = {
    total: React.PropTypes.number.isRequired
};

export default TotalVotes;