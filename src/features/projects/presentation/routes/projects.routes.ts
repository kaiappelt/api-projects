import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import ListProjectsController from "../controllers/ListProjectsController";
import CreateProjectsController from "../controllers/CreateProjectsController";
import UpdateProjectsController from "../controllers/UpdateProjectsController";
import DeleteProjectsController from "../controllers/DeleteProjectsController";
import ShowProjectController from "../controllers/ShowProjectController";

let projectsRoutes = Router();
let listProjectsController = new ListProjectsController();
let createProjectController = new CreateProjectsController();
let updateProjectController = new UpdateProjectsController();
let deleteProjectController = new DeleteProjectsController();
let showProjectController = new ShowProjectController();

// Para listar os usuários cadastrados, é preciso estar autenticado
projectsRoutes.get(
  "/", 
  listProjectsController.run
);

projectsRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),

  showProjectController.run
);

projectsRoutes.post(
  "/",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  // Chama o controller
  createProjectController.run
);

projectsRoutes.put(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },

    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  updateProjectController.run
);

projectsRoutes.delete(
  "/:id",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  // Chama o controller
  deleteProjectController.run
);

export default projectsRoutes;
