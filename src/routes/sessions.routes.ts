import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// essa rota vai receber o midleware criado no arquivo index.ts, quando não tem rota, passamos o midleware
sessionsRouter.post('/', async (request, response) => {
console.log('tessste')
    const { email, password } = request.body;

    const authenticateService = new AuthenticateUserService();

    const { user, token } = await authenticateService.execute({
      email,
      password
    })

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;
