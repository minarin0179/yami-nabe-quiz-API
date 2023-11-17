import express from 'express';
import bodyParser from 'body-parser';
import { readJSONLFile } from './readJSONL.js';
import { generate } from './generate.js';
import fs from 'fs';
import path from 'path';
import * as https from 'https';
import cors from 'cors';
import { Questions, getRandomQuestions, sequelize } from './sql.js';

const filePath = 'train_questions.json';
const reactPath = "/home/ubuntu/yami-nabe-quiz-react";

const app = express();
const port = 443;
const questions = await readJSONLFile(filePath);

const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

// CORSを許可する
app.use(cors());

// JSONのリクエストを解析するためのミドルウェア
app.use(bodyParser.json());

// Reactアプリケーションの静的ファイルを提供
app.use(express.static(path.join(reactPath, 'build')));

app.get('/api', async (req, res) => {
    try {
        // リクエストデータを取得
        let limit = 4;
        if (req.query.size && typeof req.query.size === 'string') limit = parseInt(req.query.size);

        if (limit < 1 || limit > 6) throw new Error('Invalid size.');

        const ingredients = (await getRandomQuestions(limit)).filter(i => 'question' in i);
        const generator = await generate(ingredients.map(({ question }) => question));

        if (!generator || !generator.result) {
            // generateに失敗した場合のエラーハンドリング
            throw new Error('Failed to generate question.');
        }

        // レスポンスデータを作成
        const responseData = {
            question: generator.result,
            ingredients: ingredients,
        };

        // レスポンスをJSON形式で返す
        res.json(responseData);
    } catch (error) {
        // エラーハンドリング
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// 材料を投入
app.post('/api', async (req, res) => {
    try {
        const { question, answer } = req.body;

        // データベースにデータを挿入
        const newQuestion = await Questions.create({ question, answer });

        res.json({
            status: 'success',
            message: 'データを挿入しました',
            data: newQuestion
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('サーバーエラー');
    }
})


app.get('*', (req, res) => {
    res.sendFile(path.join(reactPath, 'build', 'index.html'));
});


// サーバーを起動
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
