const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'sessions',
  }),
});

let messageBuffer = [];
let clientIsReady = false;

client.on('ready', () => {
  console.log('Client is ready!');
  clientIsReady = true;
  // Send all buffered messages
  messageBuffer.forEach(({recipient, message}) => {
    //client.messageSend(recipient, message);
  });
  messageBuffer = [];
});

client.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
});

client.messageSend = function (recipient, message) {
  return this.sendMessage(recipient, message)
    .then(() => console.log('Message sent!'))
    .catch((err) => console.error('Failed to send message:', err));
};

// Send a message to a group by its name
client.sendMessageToGroup = async function sendMessageToGroup(
  groupName,
  message
) {
  const chats = await client.getChats();
  const group = chats.find((chat) => chat.isGroup && chat.name === groupName);
  if (group) {
    client
      .sendMessage(group.id._serialized, message)
      .then(() => console.log('Message sent to group!'))
      .catch((err) => console.error('Failed to send message:', err));
  } else {
    console.log('Group not found!');
  }
};

client.on('message', async (message) => {
  const contact = await message.getContact();
  const senderName = contact.name || contact.number;
  console.log(`Received from ${senderName}:`, message.body);
  // back reply logic can be added here
  if (message.body?.length > 1) {
    // client.messageSend(
    //   contact.id._serialized,
    //   '🙌 Thanks for reaching out! 🚀. We will connect shortly 👍'
    // );
    client.messageSend(
      contact.id._serialized,
      'Apologies, this is an automatically generated message 😔'
    );
  }
});

client.sendWhenReady = function (recipient, message) {
  if (message?.length > 1) {
    if (clientIsReady) {
      this.messageSend(recipient, message);
    } else {
      messageBuffer.push({recipient, message});
      console.log('Client not ready, message buffered.');
    }
  }
};

client.on('remote_session_saved', () => {
  console.log('Remote session saved successfully.');
});

client.initialize();
exports.whatsappClient = client;
