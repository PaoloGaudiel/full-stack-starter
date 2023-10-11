#!/usr/bin/env node

import fetch from 'node-fetch';
import models from '../models/index.js';

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
        await models.Idol.create({
            stageName: record.fields['Stage Name'],
            groupName: record.fields['Group Name'],
            legalName: record.fields['Legal Name'],
            nationality: record.fields['Nationality'],
            birthday: record.fields['Birthday'],
            height: record.fields['Height'],
            mbti: record.fields['MBTI'],
            repEmoji: record.fields['Representative Emoji'],
            portrait: record.fields.Portrait[0].url,
            groupPicture: record.fields['Group Picture'][0].url
        });
    }
}));