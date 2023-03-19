import TelegramBot from 'node-telegram-bot-api';
import Validate from './validate.js'
import Handler from './handler.js';


const token = '6281243175:AAEWJF6a78jALgUJR9AmCKonLiu7eOjiLY8';
const bot = new TelegramBot(token, { polling: true });
let handler = new Handler(bot);
let validate = new Validate(handler);


bot.on('message', (msg) => {
    console.log(msg);
    validate.validateMsg(msg)
})