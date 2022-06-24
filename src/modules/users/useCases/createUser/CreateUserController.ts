import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { email, name } = request.body;

    let user;

    try {
      user = this.createUserUseCase.execute({ email, name });
    } catch (e) {
      return response.status(400).json({ error: "e-mail already taken" });
    }

    return response.status(201).json(user);
  }
}

export { CreateUserController };
