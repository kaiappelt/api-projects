import { Router } from "express";
import sessionsRouter from "@features/auth/presentation/routes/sessions.routes";
import usersRoutes from "@features/users/presentation/routes/users.routes";
import projectsRoutes from "src/features/projects/presentation/http/routes/projects.routes";
import impedimentsRoutes from "@features/impediments/presentation/routes/impediments.routes";
import isAuthenticated from "../middlewares/isAuthnticated";

const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/projects", isAuthenticated, projectsRoutes);
routes.use("/impediments", isAuthenticated, impedimentsRoutes);

export default routes;
