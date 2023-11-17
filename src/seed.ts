import { readJSONLFile } from './readJSONL.js';
import { Questions } from './sql.js';

const filePath = "train_questions.json";

interface QuestionData {
    question: string;
    answer_entity: string;
}

const Datas: QuestionData[] = await readJSONLFile(filePath) as QuestionData[];


// console.log(Data);

async function addQuestion() {
    try {
        const validData = Datas.filter(data => 'question' in data && 'answer_entity' in data)
                              .map(data => ({
                                  question: data.question,
                                  answer: data.answer_entity
                              }));

        await Questions.bulkCreate(validData);
    } catch (e) {
        console.error(e);
    } finally {
        await Questions.sequelize?.close();
    }
}

addQuestion();