import logging
from telegram.ext import Updater, CommandHandler

# Replace with your actual bot token
TOKEN = "7340160691:AAEh1njD56oRvWn0RcoSoTjOkaHsLBZPtX4"

def start(update, context):
    update.message.reply_text("🇺🇸 Welcome to the Quotex Signal Bot 🇧🇷")

def main():
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
