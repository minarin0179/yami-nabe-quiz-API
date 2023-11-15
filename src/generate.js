import axios from 'axios';

const generate = (async (questions) => {
    //localhostの8000ポートにリクエストを投げる
    const reqData = JSON.stringify({
        questions: questions
    });
    const reqConfig = {
        method: 'post',
        url: 'http://localhost:8000',  // リクエスト先のURL
        headers: {
            'Content-Type': 'application/json',  // リクエストヘッダーの設定
        },
        data: postData,  // 送信するデータ
    }

    const response = await axios(reqConfig);
    
    return response.data;
})