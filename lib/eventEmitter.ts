import { EventEmitter } from 'events';
import axios from 'axios';
import { Pick, PrismaClient } from "@prisma/client";
// import { prisma } from './prisma';

const eventEmitter = new EventEmitter();

eventEmitter.on('pickUpdated', async (pick: Pick) => {
    try {
        axios({
            method: 'post',
            url: '/api/update-daily-units',
            data: {
                pick
            },
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    } catch (err) {
        console.error(err)
    }
})

export default eventEmitter;
