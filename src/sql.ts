import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize('ynq', 'ynq', 'yami-nabe-quiz', {
    host: 'localhost',
    dialect: 'mysql',
})

export const Questions = sequelize.define('Questions', {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
    }
)

await Questions.sync()

type QA = {
    question: string,
    answer: string
}

export async function getRandomQuestions(limit: number): Promise<QA[]> {
    try {
        const questions = await Questions.findAll({
            order: sequelize.random(), // ランダムに並び替え
            limit,
        });

        return questions.map(model => model.get({ plain: true }));
    } catch (error) {
        console.error('Error fetching random questions:', error);
        throw error;
    }
}

console.log(typeof((await getRandomQuestions(4))[0]));