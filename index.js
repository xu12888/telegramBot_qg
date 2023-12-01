import TelegramBot from "node-telegram-bot-api";
import checkIfUserIsAdmin from "./adminCheck.mjs";

const token = "6921954885:AAGf5IpPqWumi2MPV7eWB1HQZj4gP4Cgtd0";

const bot = new TelegramBot(token, {
  polling: true,
});

bot.on("message", async (msg) => {
  const chat_id = msg.chat.id;
  const user_id = msg.from.id;
  const messageText = msg.text;
  const orignalMessage = msg.message_id; //获取原始消息ID
  try {
    if (messageText === "验群") {
      bot.sendMessage(chat_id, "此群为真", {
        reply_to_message_id: orignalMessage,
      });
    }
  } catch (error) {
    console.log("获取信息出错", error);
  }
  try {
    if (messageText === "开启全员禁言") {
      const isAdmin = await checkIfUserIsAdmin(msg);
      if (isAdmin === 1) {
        // 设置全员禁言
        bot.setChatPermissions(chat_id, { can_send_messages: false });
        bot.sendMessage(chat_id, "全员禁言已开启", {
          reply_to_message_id: orignalMessage,
        });
      }
    }
  } catch (error) {}
  try {
    if (messageText === "关闭全员禁言") {
      const isAdmin = await checkIfUserIsAdmin(msg);
      if (isAdmin === 1) {
        // 设置全员禁言
        bot.setChatPermissions(chat_id, { can_send_messages: true });
        bot.sendMessage(chat_id, "全员禁言已开启", {
          reply_to_message_id: orignalMessage,
        });
      }
    }
  } catch (error) {}
});
