import axios from 'axios';

export const generate = (async (questions: string[]) => {
    const postData = JSON.stringify({ questions });

    const reqConfig = {
        method: 'post',
        url: 'http://localhost:8000/generate',  // リクエスト先のURL
        headers: {
            'Content-Type': 'application/json',  // リクエストヘッダーの設定
        },
        data: postData,  // 送信するデータ
    }

    console.log(reqConfig);
    try{
        const result = await axios(reqConfig);
        return result.data;
    }catch(error){
        console.log(error);
        throw error;
    }
})