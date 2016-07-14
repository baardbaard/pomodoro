import React from 'react';
import ReactDOM from 'react-dom';

export default class Pomodoro extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 0,
            until: 0,
            enabled: true
        }
    }

    type(e) {
        this.setState({ until: e.target.value });
    }

    handleKeyDown(e) {
        if (e.keyCode == 13 ) { return this.start(); }
    }

    start() {
        if(this.state.until <= 0) { return; }

        this.setState({ enabled: false });
        this.interval = setInterval( () => {
            this.tick();

            if (this.isTimeUp()) {
                this.finish();
            }
        }, 1000);
    }

    isTimeUp() {
        return this.state.time == this.state.until;
    }

    finish() {
        console.log('Ding ding ding!');
        this.setState({
            time: 0,
            until: 0,
            enabled: true
        });

        let input = this.refs.input;
        input.focus();
        input.select();

        return clearInterval(this.interval);
    }

    tick() {
        this.setState({ time: this.state.time + 1 });
    }

    render() {
        return (
            <div>
                <input type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    ref="input"
                    onChange={ this.type.bind(this) }
                    onKeyDown={ this.handleKeyDown.bind(this) }
                    value={ this.state.until }
                    autoFocus />
                <button disabled={ ! this.state.enabled }
                    onClick={ this.start.bind(this) }>Go</button>
                <h1>{ this.state.time }</h1>
            </div>
        );
    }
}
