import { Router } from 'express';
import { phraseQuery } from './../controllers/query.controller';

const router = Router();

router.get('/search', phraseQuery);

export default router;
