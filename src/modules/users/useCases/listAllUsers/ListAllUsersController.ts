import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    let users = [];

    if (!user_id)
      return response
        .status(400)
        .json({ error: "user_id not found inside headers" });

    try {
      users = this.listAllUsersUseCase.execute({ user_id: user_id.toString() });
    } catch (e) {
      return response.status(400).json({ error: "user not found" });
    }

    return response.status(200).json(users);
  }
}

export { ListAllUsersController };
