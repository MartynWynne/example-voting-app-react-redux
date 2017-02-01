const socket = io.connect({transports:['polling']});

function NoVotes () {
    return <span>No votes yet</span>;
}

function OneVote (props) {
    return <span>{props.total} vote</span>;
}

function ManyVotes (props) {
    return <span>{props.total} votes</span>;
}

function TotalVotes(props) {
    const total = props.total;
    if (total === 0) {
        return <NoVotes />;
    } else if (total === 1) {
        return <OneVote total={total} />;
    } else {
        return <ManyVotes total={total} />;
    }
}

function Choices (props) {
    return (
        <div id="choice">
            <div className="choice cats">
                <div className="label">Cats</div>
                <div className="stat">{props.aPercent}%</div>
            </div>
            <div className="divider"></div>
            <div className="choice dogs">
                <div className="label">Dogs</div>
                <div className="stat">{props.bPercent}%</div>
            </div>
        </div>
    );
}

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {aPercent: 50, bPercent:50, total:0};
        this.showPage = this.showPage.bind(this);
        this.updateScores = this.updateScores.bind(this);
    }
    componentDidMount() {
        socket.on('message', this.showPage);
    }
    showPage(){
        document.body.style.opacity = 1;
        socket.on('scores', json => this.updateScores(json));
    }
    updateScores(json) {
        const data = JSON.parse(json);

        this.setState({
            aPercent: Math.round(data.a / (data.a + data.b) * 100),
            bPercent: Math.round(data.b / (data.a + data.b) * 100),
            total: data.a + data.b
        });
    }
    render(){

        return (
            <div>
                <div id="background-stats">
                    <div id="background-stats-1" style={{width: this.state.aPercent + "%"}}></div>
                    <div id="background-stats-2" style={{width: this.state.bPercent + "%"}}></div>
                </div>
                <div id="content-container">
                    <div id="content-container-center">
                        <Choices aPercent={this.state.aPercent} bPercent={this.state.bPercent} />
                    </div>
                </div>
                <div id="result">
                    <TotalVotes total={this.state.total} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Results />,
    document.getElementById('app')
);