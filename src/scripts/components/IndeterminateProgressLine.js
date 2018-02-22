import React, {Component} from 'react';

import effects from '../../assets/styles/effects.css';

export const doWithProgressLine = (action, setVisibility) => Promise.resolve(setVisibility(true)).then(action).then(_ => setVisibility(false));

const IndeterminateProgressLine = ({visible, className = ''}) => (visible ? <div className={className || effects.progressLine} /> : false);

export default IndeterminateProgressLine;
