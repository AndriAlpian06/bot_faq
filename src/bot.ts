import TelegramBot, { ReplyKeyboardMarkup } from 'node-telegram-bot-api'
import { getFAQ } from './models/faq';

const token = '7510529841:AAFOFQSOqacGh-hhTjgmgsBluT5-HDht4M4';
const bot = new TelegramBot(token, { polling: true} );

const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
        [{ text: 'FAQ'}],
        [{ text: 'Help'}]
    ],
    resize_keyboard: true
};

const faqKeyboard: ReplyKeyboardMarkup = {
    keyboard: [
        [{ text: 'Jam Opersional'}],
        [{ text: 'Syarat Gadai'}],
        [{ text: 'Cabang Terdeket'}]
    ]
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Selamat datang di faq bot!, Silhkan pilih menu dibawah untuk mengetahui seputar informasi.', { reply_markup: keyboard })
})

bot.onText(/\/faq (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match ? match[1] : '';

    const faq = await getFAQ(question)

    if(faq){
        bot.sendMessage(chatId, faq.answer, { reply_markup: keyboard})
    }else{
        bot.sendMessage(chatId, 'Maaf, saya tidak menemukan jawaban untuk pertanyaan anda.', { reply_markup: keyboard});
    }
})

bot.onText(/FAQ/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Berikut pertanyaan yang sering di tanyakan', { reply_markup: faqKeyboard});
})

bot.onText(/Help/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Silahkan ketik kendala yang kamu alami')
})

bot.onText(/Jam Opersional/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hai! Kami siap melayani Anda setiap hari dari jam 08.00 pagi hingga 18.00 sore. Jangan ragu untuk datang kapan saja dalam jam operasional kami untuk memenuhi kebutuhan finansial Anda. Kami senang bisa membantu! 😊')
})

bot.onText(/Syarat Gadai/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Halo! Mau menggadaikan barang di Pusat Gadai? Prosesnya mudah kok! Berikut syarat-syarat yang perlu disiapkan:\n\nKTP Asli - Pastikan membawa KTP yang masih berlaku. \nBarang yang akan digadaikan - Pastikan barang dalam kondisi baik. \nDokumen pendukung - Jika menggadaikan kendaraan, siapkan BPKB dan STNK. \n\nCukup bawa persyaratan ini, dan proses gadai bisa selesai dalam waktu singkat! Kami siap membantu Anda dengan senang hati 😊.')
})

bot.onText(/Cabang Terdeket/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hai! Jika Anda mencari cabang Pusat Gadai terdekat, kami siap membantu Anda. Cukup klik link ini untuk menemukan cabang kami yang paling dekat dengan lokasi Anda: Cabang Pusat Gadai Terdekat.')
})