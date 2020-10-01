import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { Test } from '../models/testModel';


const router = express.Router();

router.post(
  '/api/tests/new',
  [
    body('testName')
      .trim()
      .notEmpty()
      .withMessage('Lütfen test adı alanını boş bırakmayınız.'),
    body('testNo')
      .trim()
      .isInt({ min: 0 })
      .withMessage('Lütfen test no alanına 0\'dan büyük sayı giriniz.')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { testName, testNo, isCorrect } = req.body;

    const existingTest = await Test.findOne({ testNo: testNo });

    if (existingTest !== null) {
      return res.status(400).json({ erros: ['Test no zaten kullanılıyor. Lütfen başka bir test no seçiniz.'] });
    }

    const test = Test.build({ testName, testNo, isCorrect });
    await test.save();

    res.status(201).send(test);
  }
);


export { router as newTestRouter };