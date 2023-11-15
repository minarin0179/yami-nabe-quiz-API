import express from 'express';
import bodyParser from 'body-parser';
import { readJSONLFile } from './readJSONL.js';

const filePath = 'train_questions.json';

const app = express();
const port = 3000;
const questions = await readJSONLFile(filePath);

// JSONのリクエストを解析するためのミドルウェア
app.use(bodyParser.json());

// POSTリクエストを受け取るエンドポイント
app.get('/api', (req, res) => {
    // リクエストからデータを取得
    const { size } = req.body;

    const randomNumbers = [...Array(size)].map(() => Math.floor(Math.random() * questions.length));
    const ingredients = randomNumbers.map((randomNumber) => {
        const selected = questions[randomNumber];
        return {
            question: selected.question,
            answer: selected.answer_entity,
        }
    });

    // レスポンスデータを作成
    const responseData = {
        question: "hoge",
        ingredients: ingredients,
    };

    // レスポンスをJSON形式で返す
    res.json(responseData);
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
