import { dbClient } from "../db";

interface FAQ {
    id: number,
    question: string,
    answer: string
}

export const getFAQ = async (question: string): Promise<FAQ | null> => {
    const res = await dbClient.query(
        'SELECT * FROM faqs WHERE question ILIKE $1 LIMIT 1',
        [question]
    )

    if(res.rows.length > 0){
        return res.rows[0];
    }

    return null;
}

export const addFAQ = async (faq: FAQ): Promise<void> => {
    await dbClient.query(
        'INSERT INTO faqs (question, answer) VALUES ($1, $2)',
        [faq.question, faq.answer]
    )
}

