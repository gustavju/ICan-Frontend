import React from 'react';

const CirclePercent = ({ percent, percentColor }) => {
    let percentNum = parseInt(percent);
    // 90 is from svg r (radius)
    let strokeDashoffset = ((100 - percentNum) / 100) * (Math.PI * (90 * 2));
    let stroke = percentColor;
    return (
        <div className="circle-percent__label" data-pct={percent}>
            <svg class="circle-percent__svg" width="200" height="200" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle r="90" cx="100" cy="100" strokeDasharray="565.48" strokeDashoffset="0"></circle>
                <circle style={{strokeDashoffset, stroke}} r="90" cx="100" cy="100" strokeDasharray="565.48" strokeDashoffset="0"></circle>
            </svg>
        </div>
    );
}

export default CirclePercent;
