import * as SQLite from "expo-sqlite";

export const useDB = () => {
  const db = SQLite.openDatabaseSync("sesiones.db");

  const initDB = () => {
    const sql = `CREATE TABLE IF NOT EXISTS sesiones (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);`;
    console.log("Creando BD");
    db.execSync(sql);
  };

  const insertSession = ({ email, localId, token }) => {
    const sql = `INSERT INTO sesiones (localId, email, token) VALUES (?, ?, ?);`;
    const args = [localId, email, token];
    console.log("Creando sesión");
    return db.runSync(sql, args);
  };

  const getSession = () => {
    const sql = `SELECT * FROM sesiones;`;
    const firstRow = db.getFirstSync(sql);
    console.log("Obteniendo sesión");
    return firstRow;
  };

  const deleteSession = () => {
    const sql = `DELETE FROM sesiones;`;
    console.log("Cerrando sesión");
    return db.execSync(sql);
  };

  return {
    initDB,
    insertSession,
    getSession,
    deleteSession,
  };
};
