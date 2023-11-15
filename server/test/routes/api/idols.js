import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';

describe('/api/idols', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['idols']);
    testSession = session(app);
  });

  it('fetch all idols from the Idols table', async() => {
    const response = await testSession.get('/api/idols').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  })

  it('fetch one Idol record from the Idols table', async() => {
    const response = await testSession.get('/api/idols/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.stageName, 'Stage Name 2');
  })

});