import { Router } from "express";
import sessionsRouter from "src/features/auth/presentation/http/routes/sessions.routes";
import usersRoutes from "src/features/users/presentation/http/routes/users.routes";
import projectsRoutes from "src/features/projects/presentation/http/routes/projects.routes";
import isAuthenticated from "../middlewares/isAuthnticated";

const routes = Router();

routes.use("/auth", sessionsRouter);
routes.use("/users", usersRoutes);
routes.use("/projects", isAuthenticated, projectsRoutes);

export default routes;
