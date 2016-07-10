// @todo: Port naar ES6
// @todo: Use Webpack
// @todo: Use Gulp + Browsersync
// @todo: Add option to pause the timer
// @todo: Let timer continue after goal has been reached
// @todo: Duplicate timer to create  pause timer
// @todo: Add option to activate pause timer after timer has been finished
// @todo Track pomodoro's
// @todo: Add better alerts (browser notifications?)
// @todo: Add focus to input field
// @todo: Replace input field with dropdown

var Pomodoro = React.createClass({
    getInitialState: function() {
        return {
            time: 0,
            until: 0,
            enabled: true
        };
    },

    type: function(e) {
        this.setState({ until: e.target.value });
    },

    start: function() {
        this.setState({ enabled: false });
        this.interval = setInterval( () => {
            this.tick();

            if (this.isTimeUp()) {
                this.finish();
            }
        }, 1000);
    },

    isTimeUp: function() {
        return this.state.time == this.state.until;
    },

    finish: function() {
        console.log('Ding ding ding!');
        this.replaceState(this.getInitialState());

        ReactDOM.findDOMNode(this.refs.input).focus();

        return clearInterval(this.interval);
    },

    tick: function() {
        this.setState({ time: this.state.time + 1 });
    },

    render: function() {
        return (
            <div>
                <input ref="input" onChange={this.type} value={this.state.until} />
                <button disabled={ ! this.state.enabled } onClick={this.start}>Go</button>
                <h1>{this.state.time}</h1>
            </div>
        );
    }
});

ReactDOM.render(<Pomodoro />, document.getElementById('app'));
