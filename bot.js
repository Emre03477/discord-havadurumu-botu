const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB bağlantısı sağlandı.');
}).catch((err) => {
  console.error('MongoDB bağlantısı sağlanamadı:', err);
});

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  time: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.API_KEY}&units=metric`);
  const data = await response.json();
  return data;
}

async function sendWeatherNotification(user, city) {
  const weatherData = await getWeather(city);
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`Hava Durumu Bilgisi`)
    .addFields(
      { name: 'Şehir', value: weatherData.name, inline: true },
      { name: 'Sıcaklık', value: `${weatherData.main.temp} °C`, inline: true },
      { name: 'Hava Durumu', value: weatherData.weather[0].description, inline: true },
      { name: 'Nem', value: `${weatherData.main.humidity}%`, inline: true },
      { name: 'Rüzgar Hızı', value: `${weatherData.wind.speed} m/s`, inline: true },
      { name: 'Hava Durumu Simgesi', value: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`, inline: true }
    )
    .setTimestamp();

  user.send({ embeds: [embed] });
}

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!hava-durumu')) {
    const args = message.content.split(' ').slice(1);
    if (args.length !== 2) {
      return message.reply('Lütfen doğru formatta giriniz: `!hava-durumu {şehir} {saat:dakika}`');
    }

    const [city, time] = args;
    const [hour, minute] = time.split(':').map(Number);
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return message.reply('Lütfen saat ve dakikayı doğru formatta giriniz (HH:MM).');
    }

    const userId = message.author.id;

    await User.findOneAndUpdate(
      { userId },
      { city, time },
      { upsert: true }
    );

    const interval = setInterval(async () => {
      const now = new Date();
      const user = await User.findOne({ userId });
      if (user && now.getHours() === hour && now.getMinutes() === minute) {
        sendWeatherNotification(message.author, user.city);
      }
    }, 60000);

    message.reply(`${city} için hava durumu bildirimleri her gün saat ${time}'da DM olarak gönderilecektir.`);
  }
});

client.once('ready', () => {
  console.log('Bot çalışıyor...');
});

client.login(config.TOKEN);
