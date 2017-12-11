import {message} from 'antd';
import * as domainConstants from './domainConstants'

export function POST(url, params, cb) {
    fetch(`${domainConstants.DOMAIN}${url}`, {
        method: 'POST',
    }).then(res => res.json()).catch(err => {
        message.error(err.toString());
    })
        .then(data => {
                cb(data);
            }
        ).catch(
        err => {
            console.error(err);
            message.error(err.toString());
        }
    )
}