import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import ProjectsController from "../controllers/ProjectsController";

let projectsRoutes = Router();
let projectsController = new ProjectsController();

// Para listar os usuários cadastrados, é preciso estar autenticado
projectsRoutes.get("/", projectsController.index);

projectsRoutes.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
  }),

  projectsController.show,
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
  projectsController.create
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
  projectsController.update
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
  projectsController.delete
);

export default projectsRoutes;
