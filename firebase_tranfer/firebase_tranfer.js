const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const firestore = require("firebase-admin/firestore");


function call(){

    const serviceAccount = require('../serviceAccountKey.json');
    var firestore = require("firebase-admin/firestore");

    initializeApp({
        credential: cert(serviceAccount)
    });


    test();
}

async function test() {// 현재 날짜와 시간을 가져오기
    const currentDate = new Date();

    // 각 구성 요소를 가져오기
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // 날짜와 시간을 문자열로 포맷팅
    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const db = firestore.getFirestore();
    db.collection("cities").doc(formattedDate).set({
        name: "Los Angeles 2",
        state: "CA 2",
        country: "USA 2"
    });
}

module.exports = call;