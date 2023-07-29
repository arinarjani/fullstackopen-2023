import React from 'react';

import StatisticsLine from './StatisticsLine';

const Statistics = ({ all, good, neutral, bad }) =>{
    return (
        <>
            <StatisticsLine text={'Good'} value={good} />
            <StatisticsLine text={'Neutral'} value={neutral} />
            <StatisticsLine text={'Bad'} value={bad} />
            <StatisticsLine text={'All'} value={all} />
            <StatisticsLine text={'Average'} value={(good - bad) / all} />
            <StatisticsLine text={'Good'} value={good / all > 0 ? good / all : 0} />
        </>
    );
};

export default Statistics;

