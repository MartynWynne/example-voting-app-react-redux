import React, {PropTypes} from 'react';

class OneVote extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return <span>{this.props.total} vote</span>;
    }
}

OneVote.propTypes = {
    total: React.PropTypes.number.isRequired
};

export default OneVote;