import express from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import models from '../../models/index.js';
import interceptors from '../interceptors.js';
import helpers from '../helpers.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const records = await models.Idol.findAll();
    res.json(records.map((r) => r.toJSON()));
});

router.get('/:id', async (req, res) => {
    try {
        const record = await models.Idol.findByPk(req.params.id);
        res.json(record.toJSON());
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
})

export default router;