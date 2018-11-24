const { Router } = require('express');
const Bottle = require('../models/bottle');
const Message = require('../models/message');
const { authenticationMiddleware } = require('../middlewares/authentication');


const randomsRouter = Router();

randomsRouter.get('/bottle', authenticationMiddleware, async (req, res) => {
    const bottles = await Bottle.findAll();
    const index = Math.floor(Math.random() * bottles.length);

    const bottle = bottles[index];
    const messages = await Message.findAll({
        where: { bottleId: bottle.id },
        order: [['createdTimestamp', 'ASC']], // 오름차순 (오래된순으로)
    });

    res.status(200);
    res.send({
        id: bottle.id,
        userId: bottle.userId,
        messages: messages.map(message => ({
            messageId: message.id,
            position: {
                latitude: message.latitude,
                longitude: message.longitude,
            },
            country: message.country,
            city: message.city,
            weather: message.weather,
            content: message.content,
            timestamp: message.createdTimestamp,
        })),
    });
});


module.exports = randomsRouter;
