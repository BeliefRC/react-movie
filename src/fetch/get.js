import {message} from 'antd';
import * as domainConstants from './domainConstants'

export function get(url, params, cb) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    url += url.search(/\?/) === -1 ? `?${paramsArray.join('&')}` : url += `&${paramsArray.join('&')}`;
    fetch(`${domainConstants.DOMAIN}${url}`, {
        method: 'GET',
    }).then(res => res.json()).catch(err => {
        message.error(err.toString());
    })
        .then(data => {
                if (cb){
                    cb(data);
                }
            }
        ).catch(
        err => {
            console.error(err);
            message.error(err.toString());
        }
    )
}