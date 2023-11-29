import assert from 'assert';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import session from 'supertest-session';

import helper from '../../helper.js';
import app from '../../../app.js';
import models from '../../../models/index.js';

describe('/api/idols', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['idols']);
    testSession = session(app);
  });

  it('creates a new Idol', async() => {
    const response = await testSession.post('/api/idols')
      .send({ stageName: 'Stage Name', groupName: 'Group Name' })
      .expect(StatusCodes.CREATED);

    const record = await models.Idol.findByPk(response.body.id);
    assert.deepStrictEqual(record.stageName, 'Stage Name');
    assert.deepStrictEqual(record.groupName, 'Group Name');
  });

  it('updates an existing Idol', async() => {
    await testSession.patch('/api/idols/10001')
      .send({
        stageName: "Stage Name 2",
        groupName: "Group Name 2"
        })
      .expect(StatusCodes.OK);
    const record = await models.Idol.findByPk(10001);
    assert.deepStrictEqual(record.stageName, 'Stage Name 2');
    assert.deepStrictEqual(record.groupName, 'Group Name 2');
  })

  it('deletes an existing Idol', async() => {
    await testSession.delete('/api/idols/10001')
      .expect(StatusCodes.OK);

      const record = await models.Idol.findByPk(10001);
      assert.deepStrictEqual(record, null);
  })

  it('fetch all idols from the Idols table', async() => {
    const response = await testSession.get('/api/idols').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.status, StatusCodes.OK);
    assert.deepStrictEqual(response.body?.length, 2);
    // console.log(response.body);
  });

  it('fetch one Idol record from the Idols table', async() => {
    const response = await testSession.get('/api/idols/10001').expect(StatusCodes.OK);
    assert.deepStrictEqual(response.body?.stageName, 'Stage Name 2');
  });

});