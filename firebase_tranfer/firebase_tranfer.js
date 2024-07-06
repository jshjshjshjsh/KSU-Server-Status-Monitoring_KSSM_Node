const { initializeApp, applicationDefault, cert, getApps } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firestore = require("firebase-admin/firestore");


function call(measured_time, status_result){

    const serviceAccount = require('../serviceAccountKey.json');

    // Check if Firebase apps are already initialized
    if (!getApps().length) {
        initializeApp({
            credential: cert(serviceAccount)
        });
    }


    return request(measured_time, status_result);
}

async function request(measured_time, status_result) {// 현재 날짜와 시간을 가져오기

    // 각 구성 요소를 가져오기
    const year = measured_time.getUTCFullYear();
    const month = measured_time.getUTCMonth() + 1;
    const day = measured_time.getUTCDate();
    const hours = measured_time.getUTCHours();
    const minutes = measured_time.getUTCMinutes();
    const seconds = measured_time.getUTCSeconds();
    const milliSeconds = measured_time.getUTCMilliseconds();

    // 날짜와 시간을 문자열로 포맷팅
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliSeconds).padStart(3, '0')}`;

    const db = firestore.getFirestore();
    db.collection("KSSM_NODE").doc(formattedDate).set({
        measured_time: new Date(measured_time.getTime() - 9 * 60 * 60 * 1000),
        type: status_result['type'],
        status_code: status_result['status_code'],
        status_color: status_result['status_color'],
        required_time: status_result['required_time'],
        required_color: status_result['required_color']
    });

    return formattedDate;
}

module.exports = call;