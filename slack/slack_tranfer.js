const https = require('https');
const { SLACK_WEBHOOK_URL, SLACK_CHANNEL_NAME } = require('../SECRETS.js');

function slack_call(context) {
    const slackData = JSON.stringify({
        icon_emoji: ':pleading_face:',
        username: 'KSSM ALART',
        text: context.trim()
    });
    console.log(context.trim())

    const url = new URL(SLACK_WEBHOOK_URL);
    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length':  Buffer.byteLength(slackData, 'utf8')
        }
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response:', data);
        });
    });

    req.on('error', (err) => {
        console.error('Error:', err);
    });

    req.write(slackData);
    req.end();
}


module.exports = slack_call;