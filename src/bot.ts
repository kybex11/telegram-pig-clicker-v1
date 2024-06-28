import TelegramBot from 'node-telegram-bot-api';
import config from './config.json';

const bot = new TelegramBot(config.token, { polling: true });

bot.onText(/\/start/, (msg: TelegramBot.Message) => {
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

bot.on('polling_error', (error: Error) => {
    console.error(error);
});
