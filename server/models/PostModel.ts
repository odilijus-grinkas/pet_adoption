import { Pool } from 'mysql2/promise';

export const getAll = async function (db: Pool) {
    const q = "SELECT * FROM post";
    return await db.query(q)
}