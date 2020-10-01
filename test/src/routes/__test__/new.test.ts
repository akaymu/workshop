import request from 'supertest';

import { app } from '../../app';

it('returns 400 when user exists', async () => {
  await request(app)
    .post('/api/tests/new')
    .send({
      testName: 'deneme',
      testNo: 2,
      isCorrect: true
    })
    .expect(201);

  await request(app)
    .post('/api/tests/new')
    .send({
      testName: 'deneme', testNo: 2, isCorrect: true
    })
    .expect(400);
});