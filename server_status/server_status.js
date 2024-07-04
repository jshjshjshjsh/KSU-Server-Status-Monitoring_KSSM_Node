const https = require('https');

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

async function server_check_request(type, options, measured_time) {
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
    } catch (err) {
        console.error('Error:', err);
        return { required_time: 1, status_code: 500 };
    }

    let finish_time = new Date();
    required_time = (finish_time - measured_time) / 1000;
    return { required_time: required_time, status_code: status_code, type: type };
}

module.exports = server_check_request;
