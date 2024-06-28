const TelegramBot = require('node-telegram-bot-api');
const config = require('./config.json');

const bot = new TelegramBot(config.token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Нажмите на кнопку ниже, чтобы открыть приложение', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Открыть приложение',
                    web_app: {
                        url: 'https://youtube.com/'
                    }
                }]
            ]
        }
    });
});

bot.on('polling_error', (error) => {
    console.error(error);
});