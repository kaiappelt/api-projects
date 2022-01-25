import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";
import ListImpedimentsService from "../../services/ListImpedimentsService";

export default class ListImpedimentController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const listImpediments = container.resolve(ListImpedimentsService);

    const impediments = await listImpediments.execute();

    return response.json(impediments);
  }
}
