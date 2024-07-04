import * as https from 'node:https';
//import call from './firebase_tranfer/firebase_tranfer.js';
/**
 * Pass the data to send as event.data, and the request options as
 * event.options. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
export const handler = (event, context, callback) => {
    const options = {
        ...event.options,
        method: 'GET',
        // Include other options like headers if needed
    };

    //const req = https.request('https://portal.ks.ac.kr/common/logout_v2.jsp', options, (res) => {
    const req = https.request('https://kscms.ks.ac.kr/common/sso/logout_v2.jsp', options, (res) => {
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Successfully processed HTTPS response');
            const call = require('firebase_tranfer/firebase_tranfer.js')
            call()

            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            callback(null, body);
        });
    });

    req.on('error', (err) => {
        console.error('Error:', err);
        callback(err);
    });

    req.end();
};