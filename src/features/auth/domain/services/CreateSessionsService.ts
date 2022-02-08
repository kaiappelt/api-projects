import authConfig from "@config/auth";
import AppError from "src/core/domain/errors/AppError";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import { IUserRepository } from "src/features/users/domain/repositories/IUserRepository";
import { ICreateSessions } from "../models/ICreateSessions";
import { IUserAuthenticated } from "../models/IUserAuthenticated";
import { IHashProvider } from "@features/users/domain/providers/hashProvider/models/IHashProvider";
@injectable()
class CreateSessionsService {
  constructor(
    // INJEÇÃO DE DEPENDENCIA
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessions): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await this.hashProvider.compareHash(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    // CONSTROI TOKEN
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    // RETORNA USUARIO E TOKEN
    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
