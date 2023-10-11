import assert from 'assert';
import _ from 'lodash';
import path from 'path';
import { v4 as uuid } from 'uuid';

import helper from '../helper.js';
import models from '../../models/index.js';

describe('models.Idol', () => {
  beforeEach(async () => {
    await helper.loadFixtures([]);
  });

  it('creates a new Idol record', async () => {
    assert.deepStrictEqual(await models.Idol.count(), 0);
    const record = await models.Idol.create({
        stageName: 'Stage Name',
        groupName: 'Group Name',
        legalName: 'Legal Name',
        nationality: 'Nationality',
        birthday: 'Month, Day Year',
        height: 'Height',
        mbti: 'MBTI',
        repEmoji: 'EMOJI',
        portrait: 'Portrait URL',
        groupPicture: 'Group Picture URL'
    });
    assert.deepStrictEqual(await models.Idol.count(), 1);
    assert.notDeepStrictEqual(record.id, null);
    assert.deepStrictEqual(record.stageName, 'Stage Name');
    assert.deepStrictEqual(record.groupName, 'Group Name');
    assert.deepStrictEqual(record.legalName, 'Legal Name');
    assert.deepStrictEqual(record.nationality, 'Nationality');
    assert.deepStrictEqual(record.birthday, 'Month, Day Year');
    assert.deepStrictEqual(record.height, 'Height');
    assert.deepStrictEqual(record.mbti, 'MBTI');
    assert.deepStrictEqual(record.repEmoji,'EMOJI');
    assert.deepStrictEqual(record.portrait, 'Portrait URL');
    assert.deepStrictEqual(record.groupPicture, 'Group Picture URL');
  });
});