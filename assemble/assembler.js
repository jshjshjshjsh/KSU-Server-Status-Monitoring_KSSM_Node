const {server_check_request, response_code_color_result, response_time_color_result, RED_CIRCLE, ORANGE_CIRCLE, GREEN_CIRCLE} = require('../server_status/server_status');
const call = require('../firebase_tranfer/firebase_tranfer.js');
const slack_call = require('../slack/slack_tranfer.js');


function assemble(type, options) {

    (async () => {
        const measured_time = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

        let required_time_min = 99999;
        let status_code = '';

        for (let i = 0; i < 3; i++) {
            const response_status = await server_check_request(type, options);
            status_code = response_status['status_code']
            required_time_min = Math.min(required_time_min, response_status['required_time'])
        }

        // 여기서 판별 후 status_result 재생성
        let required_color = response_time_color_result(required_time_min);
        let status_color = response_code_color_result(status_code);
        const status_result = { required_color: required_color, required_time: required_time_min, status_color: status_color, status_code: status_code, type: type };

        // todo: 임시로 만든 값이기 때문에 삭제 필요
        //status_result['required_color'] = ORANGE_CIRCLE

        // db에 저장
        let measured_time_formatted = call(measured_time, status_result);

        // 상태와, 응답 시간에 따라 Slack 호출
        if ( status_result['required_color'] !== GREEN_CIRCLE || status_result['status_color'] !== GREEN_CIRCLE){
            slack_call(
    `:exclamation: 어라? 서버 상태를 확인 해봐야겠는데요?\n\n
    \t\t\t서버 유형 : [${status_result['type'].toUpperCase()}]\n
    \t\t\t관측 시간 : [${(await measured_time_formatted).trim()}]\n
    \t\t\t${status_result['required_color']} 서버 응답 속도 : [${status_result['required_time']} 초]\n
    \t\t\t${status_result['status_color']} 서버 응답 코드 : [${status_result['status_code']}]`)
        }

        console.log(status_result);
    })();
}

module.exports = assemble;