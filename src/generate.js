import axios from 'axios';

export const generate = (async (questions) => {
    //localhostの8000ポートにリクエストを投げる
    const postData = JSON.stringify({
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

    try{
        const response = await axios(reqConfig);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error;
    }
})