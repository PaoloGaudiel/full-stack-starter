#!/usr/bin/env node

import path from 'path';
import { unlink, writeFile } from 'fs/promises';

import models from '../models/index.js';
import s3 from '../lib/s3.js';


import fetch from 'node-fetch';

console.log('Testing');

const url = 'https://api.airtable.com/v0/appUxSybGA38lbH30/Idols';
const token = 'pat8JUooC1dwj8jXu.7165b80ece482ca97838855878749eb5c73c1510cf78a7591cad4db1fe123606';

fetch(url, {
    headers: { Authorization: `Bearer ${token}`}
})
.then((response) => response.json())
.then((async (data) => {
    // console.log(data)
    for (const record of data.records) {
        
        let portrait;
        if (record.fields.Portrait.length > 0) {
            const Portrait = record.fields.Portrait[0];
            const { url } = Portrait;
            const filename = `${Portrait.id}.jpg`;
            console.log('portrait', Portrait, filename, url);
            const filePath = path.resolve(filename);
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                await writeFile(filePath, Buffer.from(arrayBuffer));
                const key = path.join('uploads', filename);
                await s3.putObject(key, filePath);
                portrait = filename;
            } catch (err) {
                console.log(err);
            } finally {
                await unlink(filePath);
            }
        }

        let groupPicture;
        if (record.fields['Group Picture'].length > 0) {
            const GroupPicture = record.fields['Group Picture'][0];
            const { url } = GroupPicture;
            const filename = `${GroupPicture.id}.jpg`;
            console.log('grouppicture', filename, url);
            const filePath = path.resolve(filename);
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                await writeFile(filePath, Buffer.from(arrayBuffer));
                const key = path.join('uploads', filename);
                await s3.putObject(key, filePath);
                groupPicture = filename;
            } catch (err) {
                console.log(err);
            } finally {
                await unlink(filePath);
            }
        }
        

        await models.Idol.create({
            stageName: record.fields['Stage Name'],
            groupName: record.fields['Group Name'],
            legalName: record.fields['Legal Name'],
            nationality: record.fields['Nationality'],
            birthday: record.fields['Birthday'],
            height: record.fields['Height'],
            mbti: record.fields['MBTI'],
            repEmoji: record.fields['Representative Emoji'],
            portrait,
            groupPicture,
        });
    }
}));