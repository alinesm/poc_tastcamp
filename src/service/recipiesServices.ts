import { QueryResult } from "pg";
import ErrorsType from "../protocols/Errors";
import RecipieCreate from "../protocols/Recipies";
import recipiesRepositories from "../repositories/recipiesRepositories";
import { number } from "joi";

async function create({
  title,
  prepare,
  ingridients,
}: RecipieCreate): Promise<void | ErrorsType> {
  const {
    rows: [recipie],
  } = await recipiesRepositories.findByTitle(title);
  if (recipie)
    return {
      name: "ConflictError",
      message: "title already exists",
    };

  await recipiesRepositories.create({ title, prepare, ingridients });
}

async function findAll(): Promise<RecipieCreate[]> {
  const { rows: recipies } = await recipiesRepositories.findAll();
  return recipies;
}

async function deleteRecipie(id: number): Promise<void | ErrorsType> {
  const { rowCount } = await recipiesRepositories.findById(id);
  if (rowCount === 0)
    throw {
      name: "Not found",
      message: "id not found",
    };

  await recipiesRepositories.deleteRecipie(id);
}

async function update({ id, title, prepare, ingridients }: RecipieCreate) {
  const idNumber = Number(id);
  const { rowCount } = await recipiesRepositories.findById(idNumber);
  if (rowCount === 0)
    throw {
      name: "Not found",
      message: "id not found",
    };

  await recipiesRepositories.update({ id, title, prepare, ingridients });
}

export default {
  create,
  findAll,
  deleteRecipie,
  update,
};
