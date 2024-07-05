const {server_check_request, RED_CIRCLE, ORANGE_CIRCLE, GREEN_CIRCLE} = require('../server_status/server_status');
const call = require('../firebase_tranfer/firebase_tranfer.js');
const slack_call = require('../slack/slack_tranfer.js');


function assemble(type, options) {

    // 시작 시간
    let measured_time = new Date();

    (async () => {
        const measured_time = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
        const status_result = await server_check_request('portal', options);

        status_result['required_color'] = ORANGE_CIRCLE
        // db에 저장
        let measured_time_formatted = call(measured_time, status_result);

        // 상태와, 응답 시간에 따라 Slack 호출
        if ( status_result['required_color'] !== GREEN_CIRCLE || status_result['status_color'] !== GREEN_CIRCLE){
            slack_call(
    `:exclamation: 어라? 서버 상태를 확인 해봐야겠는데요?\n\n
    \t\t\t관측 시간 : [${(await measured_time_formatted).trim()}]\n
    \t\t\t${status_result['required_color']} 서버 응답 속도 : [${status_result['required_time']} 초]\n
    \t\t\t${status_result['status_color']} 서버 응답 코드 : [${status_result['status_code']}]`)
        }

        console.log(status_result);
    })();
}

module.exports = assemble;