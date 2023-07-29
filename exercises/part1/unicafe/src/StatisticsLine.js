import React from 'react'

const StatisticsLine = ( {text, value} ) => {
    return (
        <table>
            <tbody>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
            </tbody>
        </table>
    )
}

export default StatisticsLine;