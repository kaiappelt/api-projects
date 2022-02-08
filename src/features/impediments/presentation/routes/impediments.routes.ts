import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import ListImpedimentsController from "../controllers/ListImpedimentsController";
import CreateImpedimentController from "../controllers/CreateImpedimentController";
import UpdateImpedimentController from "../controllers/UpdateImpedimentController";
import DeleteImpedimentController from "../controllers/DeleteImpedimentController";
import ShowImpedimentController from "../controllers/ShowImpedimentController";

let impedimentsRoutes = Router();
let listImpedimentsController = new ListImpedimentsController();
let createImpedimentController = new CreateImpedimentController();
let updateImpedimentController = new UpdateImpedimentController();
let deleteImpedimentController = new DeleteImpedimentController();
let showImpedimentController = new ShowImpedimentController();

impedimentsRoutes.get(
  "/", 
  listImpedimentsController.run
);

impedimentsRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),

  showImpedimentController.run
);

impedimentsRoutes.post(
  "/",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      project_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      active: Joi.boolean().required(),
    },
  }),
  // Chama o controller
  createImpedimentController.run
);

impedimentsRoutes.put(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      active: Joi.boolean().required(),
    },

    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  updateImpedimentController.run
);

impedimentsRoutes.delete(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  deleteImpedimentController.run
);

export default impedimentsRoutes;
