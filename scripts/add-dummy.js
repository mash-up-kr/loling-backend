const db = require('../app/db');
const Bottle = require('../app/models/bottle');
const Message = require('../app/models/message');
const bottleDummy = require('./bottle-dummy.json');
const messageDummy = require('./message-dummy.json');


async function addDummy() {
    await db.sync();

    const bottle1 = await Bottle.create({
        userId: bottleDummy[0].userId,
        createdTimestamp: bottleDummy[0].createdTimestamp,
        hits: bottleDummy[0].hits,
    });

    const message1 = await Message.create({
        bottleId: bottle1.id,
        latitude: messageDummy[0].latitude,
        longitude: messageDummy[0].longitude,
        country: messageDummy[0].country,
        city: messageDummy[0].city,
        weather: messageDummy[0].weather,
        content: messageDummy[0].content,
        createdTimestamp: messageDummy[0].createdTimestamp,
    });

    const bottle2 = await Bottle.create({
        userId: bottleDummy[1].userId,
        createdTimestamp: bottleDummy[1].createdTimestamp,
        hits: bottleDummy[1].hits,
    });

    const message2 = await Message.create({
        bottleId: bottle2.id,
        latitude: messageDummy[1].latitude,
        longitude: messageDummy[1].longitude,
        country: messageDummy[1].country,
        city: messageDummy[1].city,
        weather: messageDummy[1].weather,
        content: messageDummy[1].content,
        createdTimestamp: messageDummy[1].createdTimestamp,
    });

    const bottle3 = await Bottle.create({
        userId: bottleDummy[2].userId,
        createdTimestamp: bottleDummy[2].createdTimestamp,
        hits: bottleDummy[2].hits,
    });

    const message3 = await Message.create({
        bottleId: bottle3.id,
        latitude: messageDummy[2].latitude,
        longitude: messageDummy[2].longitude,
        country: messageDummy[2].country,
        city: messageDummy[2].city,
        weather: messageDummy[2].weather,
        content: messageDummy[2].content,
        createdTimestamp: messageDummy[2].createdTimestamp,
    });

    console.log(bottle1, bottle2, bottle3);
    console.log(message1, message2, message3);
}

addDummy().catch(error => console.error(error));
