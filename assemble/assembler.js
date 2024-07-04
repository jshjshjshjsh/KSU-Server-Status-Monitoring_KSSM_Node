const server_check_request = require('../server_status/server_status');
const call = require('../firebase_tranfer/firebase_tranfer.js');


function assemble(type, options) {

    // 시작 시간
    let measured_time = new Date();

    (async () => {
        const measured_time = new Date();
        const status_result = await server_check_request('portal', options, measured_time);

        call(measured_time, status_result)

        console.log(status_result)
        //console.log(status_result['required_time']);
    })();
}

module.exports = assemble;