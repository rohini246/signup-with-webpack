import {db} from '../dbConfig/config'
export const runQuery = async (sql: string): Promise<any> => {
    return await new Promise(
        (resolve, reject) => db.query(sql, (err: Error, result: object) => {
            if (err) { reject(err); }
            resolve(result);
        })
    ).then(val => JSON.parse(JSON.stringify(val)));
}
