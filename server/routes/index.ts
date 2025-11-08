import express, { Request, Response } from 'express';

const router = express.Router();

/* GET API health. */
router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default router;

