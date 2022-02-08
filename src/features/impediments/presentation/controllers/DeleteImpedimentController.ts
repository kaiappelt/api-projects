import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/presentation/contracts/IController";
import DeleteImpedimentService from "../../domain/services/DeleteImpedimentService";

export default class DeleteImpedimentController implements IController{
   public async run(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteImpediment = container.resolve(DeleteImpedimentService);

    await deleteImpediment.execute({ id });

    return response.json([]);
  }
}
