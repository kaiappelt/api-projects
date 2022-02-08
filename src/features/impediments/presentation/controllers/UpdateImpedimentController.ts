import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/presentation/contracts/IController";
import UpdateImpedimentService from "../../domain/services/UpdateImpedimentService";

export default class UpdateImpedimentController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const { name, description, active } = request.body;
    const { id } = request.params;

    const updateImpediment = container.resolve(UpdateImpedimentService);

    const impediment = await updateImpediment.execute({
      id,
      name,
      description,
      active
    });

    return response.json(impediment);
  }
}
