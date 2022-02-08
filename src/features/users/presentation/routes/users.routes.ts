import { Router } from "express";
import { celebrate, Joi, Segments, errors } from "celebrate";
import isAuthenticated from "src/core/presentation/http/middlewares/isAuthnticated";
import ListUsersController from "../controllers/ListUsersController";
import CreateUsersController from "../controllers/CreateUsersController";

let usersRoutes = Router();
let listUsersController = new ListUsersController();
let createUsersController = new CreateUsersController();

// Para listar os usuários cadastrados, é preciso estar autenticado
usersRoutes.get("/", isAuthenticated,
listUsersController.run);

usersRoutes.post(
  "/",
  //MIDDLEWARE
  // Validação dos campos utilizando o celebrate
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      // Verifica se os campos Senha e Confirmação de Senha são iguais
      password_confirmation: Joi.string()
        .valid(Joi.ref("password"))
        .when("password", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  // Chama o controller
  createUsersController.run
);

export default usersRoutes;
