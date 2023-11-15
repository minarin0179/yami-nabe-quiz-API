import express from 'express';
import bodyParser from 'body-parser';
import { readJSONLFile } from './readJSONL.js';
import {generate } from './generate.js';

const filePath = 'train_questions.json';

const app = express();
const port = 3000;
const questions = await readJSONLFile(filePath);

// JSONのリクエストを解析するためのミドルウェア
app.use(bodyParser.json());

// POSTリクエストを受け取るエンドポイント
app.get('/api', async (req, res) => {
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

    const question = await generate(ingredients.map((ingredient) =>ingredient.question))
    //TODO generateに失敗したらエラーコードを返す

    // レスポンスデータを作成
    const responseData = {
        question: question || "hoge",
        ingredients: ingredients,
    };

    // レスポンスをJSON形式で返す
    res.json(responseData);
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
