import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";
import ShowImpedimentService from "../../services/ShowImpedimentService";

export default class ShowImpedimentController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showImpediment = container.resolve(ShowImpedimentService);

    const impediment = await showImpediment.execute({ id });

    return response.json(impediment);
  }
}
