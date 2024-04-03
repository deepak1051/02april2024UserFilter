import express from 'express';
const router = express.Router();

import { createTeam, getTeam, getTeams } from '../controllers/team.js';

router.post('/', createTeam);
router.get('/:id', getTeam);
router.get('/', getTeams);

export default router;
