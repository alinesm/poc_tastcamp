import { QueryResult } from "pg";
import connectionDb from "../config/database";
import RecipieCreate from "../protocols/Recipies";

async function create({
  title,
  prepare,
  ingridients,
}: RecipieCreate): Promise<void> {
  await connectionDb.query(
    `
        INSERT INTO recipies (title, prepare, ingridients)
        VALUES ($1, $2, $3)
        `,
    [title, prepare, ingridients]
  );
}

async function findByTitle(title: string) {
  return await connectionDb.query(
    `
        SELECT * FROM recipies WHERE title = $1;
    `,
    [title]
  );
}

async function findAll(): Promise<QueryResult<RecipieCreate>> {
  return await connectionDb.query(
    `
        SELECT
         *
        FROM recipies

    `
  );
}

async function findById(id: number) {
  return await connectionDb.query(
    `
          SELECT * FROM recipies
          WHERE id = $1;
      `,
    [id]
  );
}

async function deleteRecipie(id: number) {
  console.log("id", id);
  return await connectionDb.query(
    `
    DELETE FROM recipies
          WHERE id = $1;
      `,
    [id]
  );
}

async function update({
  id,
  title,
  prepare,
  ingridients,
}: RecipieCreate): Promise<void> {
  await connectionDb.query(
    `
      UPDATE recipies
      SET title=$1, prepare=$2, ingridients=$3
      WHERE id = $4;
  `,
    [title, prepare, ingridients, id]
  );
}

export default {
  deleteRecipie,
  create,
  findByTitle,
  findAll,
  findById,
  update,
};
