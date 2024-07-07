const https = require('https');

const RED_CIRCLE = ':red_circle:'
const ORANGE_CIRCLE = ':large_orange_circle:'
const GREEN_CIRCLE = ':large_green_circle:'

function httpsRequest(url, options) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: body
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        req.end();
    });
}

async function server_check_request(type, options) {
    let url = '';

    if (type === 'portal') {
        url = 'https://portal.ks.ac.kr/common/logout_v2.jsp';
    } else if (type === 'homepage') {
        url = 'https://kscms.ks.ac.kr/common/sso/logout_v2.jsp';
    }

    let status_code = '';
    let required_time = '';
    let start_time = new Date();

    try {
        const res = await httpsRequest(url, options);
        status_code = res.statusCode;
        console.log(url);
    } catch (err) {
        console.error('Error:', err);
        return { required_time: 1, status_code: 500 };
    }

    let finish_time = new Date();
    required_time = (finish_time - start_time) / 1000;

    return { required_time: required_time, status_code: status_code, type: type };
}

function response_time_color_result(required_time){
    let RED_TIME = 5;
    let ORANGE_TIME = 2.5;

    if (required_time >= RED_TIME){
        return RED_CIRCLE;
    }
    if (required_time >= ORANGE_TIME){
        return ORANGE_CIRCLE;
    }
    return GREEN_CIRCLE;
}

function response_code_color_result(code){

    if (code >= 200 && code < 300) {
        return GREEN_CIRCLE;
    }
    return RED_CIRCLE;
}

module.exports = {
    server_check_request,
    response_time_color_result,
    response_code_color_result,
    RED_CIRCLE,
    ORANGE_CIRCLE,
    GREEN_CIRCLE
};
