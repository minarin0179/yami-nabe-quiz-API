import fs from 'fs';
import readline from 'readline';

export const readJSONLFile = (filePath: string): Promise<object[]> => {
    return new Promise((resolve, reject) => {
        const dataArray: object[] = [];

        const readStream = readline.createInterface({
            input: fs.createReadStream(filePath),
            crlfDelay: Infinity
        });

        readStream.on('line', (line) => {
            try {
                const jsonObject = JSON.parse(line);
                dataArray.push(jsonObject);
            } catch (error) {
                reject(error);
            }
        });

        readStream.on('close', () => {
            resolve(dataArray);
        });

        readStream.on('error', (error) => {
            reject(error);
        });
    });
};
