import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
        This calculator enables you to calculate the N-th prime number.
        <Link to="/">Home</Link>
        </div>
    );
}