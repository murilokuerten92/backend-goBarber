import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppoitmentService';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointment = await appointmentsRepository.find();

  return response.json(appointment);
});

// essa rota vai receber o midleware criado no arquivo index.ts, quando não tem rota, passamos o midleware
appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentService = new CreateAppointmentService();

    const appointment = await appointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);

});

export default appointmentsRouter;
