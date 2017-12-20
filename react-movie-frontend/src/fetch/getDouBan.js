import {message} from 'antd';
import fetchJsonp from 'fetch-jsonp'

export function getDouBan(id, cb) {
    fetchJsonp(`https://api.douban.com/v2/movie/subject/${id}`)
        .then(res => res.json())
        .then(data => {
                if (cb) {
                    cb(data);
                }
            }
        )
        .catch(
            err => {
                console.error(err);
                message.warn('请输入正确的id')
            }
        )
}