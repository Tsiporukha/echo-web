import {isProduction} from './base';

const prefixUrl = isProduction ? 'https://s3.amazonaws.com/echoapp' : 'http://localhost:9000';

export const getAssetUrl = path => `${prefixUrl}/assets${path}`;
