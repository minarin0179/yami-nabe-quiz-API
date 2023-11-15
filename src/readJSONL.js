import fs from 'fs';
import readline from 'readline';

export const readJSONLFile = ((filePath) => {
    return new Promise((resolve, reject) => {
        const dataArray = [];

        const readStream = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        readStream.on('line', (line) => {
            try {
                const jsonObject = JSON.parse(line);
                dataArray.push(jsonObject);
            } catch (error) {
                reject(`JSONパースエラー: ${error.message}`);
            }
        });

        readStream.on('close', () => {
            resolve(dataArray);
        });

        readStream.on('error', (error) => {
            reject(`ファイル読み込みエラー: ${error.message}`);
        });
    });
});