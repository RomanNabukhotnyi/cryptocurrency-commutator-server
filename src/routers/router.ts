import { Router } from 'express';

import { Controller } from '../controllers/controller';

export const createRouter = () => {
    const router = Router();
    router.get('/', Controller.getAll);
    router.get('/:cryptocurrensyName', Controller.get);
    router.delete('/', Controller.deleteAll);
    router.delete('/:cryptocurrensyName', Controller.delete);
    router.post('/', Controller.post);
    router.put('/:cryptocurrensyName', Controller.update);
    return router;
};