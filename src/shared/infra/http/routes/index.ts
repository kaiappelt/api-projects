import { Router } from "express";
import sessionsRouter from "@modules/auth/infra/http/routes/sessions.routes";
import usersRoutes from "@modules/users/infra/http/routes/users.routes";
import projectsRoutes from "@modules/projects/infra/http/routes/projects.routes";
import isAuthenticated from "../middlewares/isAuthnticated";

const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/projects", isAuthenticated, projectsRoutes);

export default routes;
