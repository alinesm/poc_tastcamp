import { Request, Response } from "express";
import recipiesServices from "../service/recipiesServices";
import RecipieCreate from "../protocols/Recipies";
import { number } from "joi";

export async function createRecipie(req: Request, res: Response) {
  const { title, prepare, ingridients } = req.body as RecipieCreate;

  try {
    await recipiesServices.create({ title, prepare, ingridients });

    return res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function listRecipies(req: Request, res: Response) {
  try {
    const recipies: RecipieCreate[] = await recipiesServices.findAll();

    return res.send({ recipies });
  } catch (error) {
    res.status(500).send("Deu zica no servidor de banco de dados");
  }
}

export async function updateRecipie(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);
  const { title, prepare, ingridients } = req.body as RecipieCreate;

  try {
    await recipiesServices.update({ id, title, prepare, ingridients });

    res.send("A sua receita foi atualizada com sucesso!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Houve um problema com o banco de dados!");
  }
}

export async function deleteRecipie(
  req: Request,
  res: Response
): Promise<void> {
  const id = Number(req.params.id);
  try {
    await recipiesServices.deleteRecipie(id);

    res.status(202).send("Ok");
  } catch (error) {
    res.status(500).send("Deu algo errado no servidor");
  }
}
