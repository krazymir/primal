import React, { Component } from 'react';
import axios from 'axios';

class Primal extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    renderSeenIndexes() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const items = [];
        for(let key in this.state.values) {
            items.push(
                <div key={key}>
                    The prime number with index {key} is {this.state.values[key]}
                </div>
            );
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        await axios.post('/api/values', {
          index: this.state.index
        });
        this.setState({ index: '' });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Index of the prime:</label>
                    <imput type="text"
                    value={this.state.index}
                    onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>
                <h3>Seen indexes: </h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values: </h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Primal;