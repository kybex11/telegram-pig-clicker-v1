const TelegramBot = require('node-telegram-bot-api');

const token = '7363087629:AAEq-vQzdDMHT6iOCK4LXNBUQGmDyXv-g50';

const bot = new TelegramBot(token, { polling: true });

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