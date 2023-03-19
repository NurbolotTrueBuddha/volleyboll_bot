import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    async newCmd(msg) {
        let { text, chat: { id } } = msg;
        text = text.substring(11);

        let reserveData = await fs.readFile('./reserve.json', { encoding: 'utf8' });
        let converted = await JSON.parse(reserveData);

        await converted.push({
            title: text,
            players: []
        });

        await this.bot.sendMessage(id, `${converted[0].title}`)

        await fs.writeFile('./reserve.json', JSON.stringify(converted, null, 2));

    }

    async reserveCmd(msg) {
        let { chat: { id }, text } = msg;
        text = text.substring(8);
        let reserveData = await fs.readFile('./reserve.json', { encoding: 'utf8' });
        let converted = JSON.parse(reserveData);


        if (converted[0].players.length <= 17 && !converted[0].players.includes(text)) {

            converted[0].players.push(text);
            await fs.writeFile('./reserve.json', JSON.stringify(converted, null, 2));
            let players = '';
            for (let i = 0; i < converted[0].players.length; i++) {
                players += `${i+1}.${converted[0].players[i]}\n`;
            }
            await this.bot.sendMessage(id, `${converted[0].title}\n${players}`)

        } else if (converted[0].players.includes(text)) {
            await this.bot.sendMessage(id, 'Уже записан')
        } else {
            await this.bot.sendMessage(id, 'Полный состав')
        }
    }
    async clearCmd(msg) {
        let { chat: { id } } = msg;

        let userData = await fs.readFile('./reserve.json', { encoding: 'utf8' });

        userData = "[]";

        await fs.writeFile('./reserve.json', userData);

        await this.bot.sendMessage(id, 'Набор очищен')
    }

}