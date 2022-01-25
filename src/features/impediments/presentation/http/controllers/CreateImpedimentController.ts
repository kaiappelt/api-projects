import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";
import CreateImpedimentService from "../../services/CreateImpedimentService";

export default class CreateImpedimentController implements IController{
   public async run(request: Request, response: Response): Promise<Response> {
    const { 
      project_id, 
      name, 
      description, 
      active 
    } = request.body;

    const createImpediment = container.resolve(CreateImpedimentService);

    const impediment = await createImpediment.execute({
      project_id,
      name,
      description,
      active,
    });

    return response.json(impediment);
  }

}