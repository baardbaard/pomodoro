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

    setTime(e) {
        this.setState({ until: e.target.value });
    }

    start() {
        if(this.state.until <= 0) {
            return;
        }

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
            enabled: true
        });

        this.refs.input.focus();

        return clearInterval(this.interval);
    }

    tick() {
        this.setState({ time: this.state.time + 1 });
    }

    render() {
        return (
            <div>
                <select
                    ref="input"
                    onChange={ this.setTime.bind(this) }
                    value={ this.state.unil }
                    disabled={ ! this.state.enabled }
                    autoFocus>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>

                <button disabled={ ! this.state.enabled }
                    onClick={ this.start.bind(this) }>Go</button>

                <h1>{ this.state.time }</h1>
            </div>
        );
    }
}
