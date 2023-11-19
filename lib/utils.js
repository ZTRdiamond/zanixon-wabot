const os = require('os');
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const zn = require("zanixon.db");

function uptime() {
  let seconds = process.uptime();
  let years = Math.floor(seconds / 31536000);
  seconds %= 31536000;
  let months = Math.floor(seconds / 2592000);
  seconds %= 2592000;
  let weeks = Math.floor(seconds / 604800);
  seconds %= 604800;
  let days = Math.floor(seconds / 86400);
  seconds %= 86400;
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
    
  let uptimeLong = '';
  if (years > 0) uptimeLong += `${years} year${years > 1 ? 's' : ''}, `;
  if (months > 0) uptimeLong += `${months} month${months > 1 ? 's' : ''}, `;
  if (weeks > 0) uptimeLong += `${weeks} week${weeks > 1 ? 's' : ''}, `;
  if (days > 0) uptimeLong += `${days} day${days > 1 ? 's' : ''}, `;
  if (hours > 0) uptimeLong += `${hours} hour${hours > 1 ? 's' : ''}, `;
  if (minutes > 0) uptimeLong += `${minutes} minute${minutes > 1 ? 's' : ''}, `;
  if (seconds > 0) uptimeLong += `${seconds} second${seconds > 1 ? 's' : ''}`;

  let uptimeShort = '';
  if (years > 0) uptimeShort += `${years}y `;
  if (months > 0) uptimeShort += `${months}mo `;
  if (weeks > 0) uptimeShort += `${weeks}w `;
  if (days > 0) uptimeShort += `${days}d `;
  if (hours > 0) uptimeShort += `${hours}h `;
  if (minutes > 0) uptimeShort += `${minutes}m `;
  if (seconds > 0) uptimeShort += `${seconds}s`;
  return { long: uptimeLong, short: uptimeShort.trim() };
}

function cpu(typ0e) {
    const startTime = process.cpuUsage();
    const cpuUsage = process.cpuUsage(startTime);
    const totalUsage = (cpuUsage.user + cpuUsage.system) / 1000;
   return totalUsage;
}

function ucapan(ms) {
  var jam = new Date(ms + 6 * 3600 * 1000);
  var waktu = jam.getHours();
  var pesan = "";
    
  if (waktu >= 0 && waktu < 12) {
    pesan = "🌄︱Selamat pagi";
  } else if (waktu >= 12 && waktu < 15) {
    pesan = "🏜️︱Selamat siang";
  } else if (waktu >= 15 && waktu < 18) {
    pesan = "🌅︱Selamat sore";
  } else {
    pesan = "🌌︱Selamat malam";
  }
  return pesan;
}

function formatBytes(bytes) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function parseCmd(message, prefix, commands) {
  const cmdBody = message.startsWith(prefix) ? message.slice(prefix.length) : null;
  const cmdName = commands.find((command) => cmdBody && cmdBody.startsWith(command));
  const textBody = cmdName ? cmdBody.slice(cmdName.length).trim() : null;
  return { cmdName, textBody };
}

function simi(text, lc) {
  const lang = lc ? lc : "id";
  const url = 'https://api.simsimi.vn/v1/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = `text=${text}&lc=${lang}`;

  return axios.post(url, data, { headers })
    .then(response => {
      const message = response.data.message;
      return message;
    })
    .catch(error => {
      console.error(error);
      return '???';
    });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomText(...texts) {
  const randomIndex = Math.floor(Math.random() * texts.length);
  return texts[randomIndex];
}

function parseTime(timeRaw) {
    const regex = /^(\d+)([smhdwmyo]{1,2})$/;
    const match = timeRaw.match(regex);

    if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];

        let multiplier;
        switch (unit) {
            case 's':
                multiplier = 1000; // 1 detik = 1000 milidetik
                break;
            case 'm':
                multiplier = 60 * 1000; // 1 menit = 60 detik = 60000 milidetik
                break;
            case 'h':
                multiplier = 60 * 60 * 1000; // 1 jam = 60 menit = 3600 detik = 3600000 milidetik
                break;
            case 'd':
                multiplier = 24 * 60 * 60 * 1000; // 1 hari = 24 jam = 86400 detik = 86400000 milidetik
                break;
            case 'w':
                multiplier = 7 * 24 * 60 * 60 * 1000; // 1 minggu = 7 hari = 604800 detik = 604800000 milidetik
                break;
            case 'mo':
                // Penggunaan 30 hari sebagai perkiraan
                multiplier = 30 * 24 * 60 * 60 * 1000;
                break;
            case 'y':
                // Perhitungan tahun dengan mengasumsikan setiap tahun memiliki 365 hari
                multiplier = 365 * 24 * 60 * 60 * 1000;
                break;
            default:
                throw new Error('Unit waktu tidak valid.');
        }

        const timestamp = value * multiplier;
        const formatted = `${value}${unit}${unit.length === 1 ? '' : ''}`;
        return timestamp;
    } else {
        throw new Error('Format waktu tidak valid.');
    }
}

function parseUnix(timestamp, format) {
  format = format ? format : "{d} hari, {h} jam, {min} menit, {sec} detik";
  let milliseconds = Math.floor(parseInt(timestamp, 10));
  let now = Math.floor(Date.now());
  if (isNaN(milliseconds)) {
    throw new Error("Timestamp is not valid number!");
  }
  
  let ms = Math.floor((milliseconds - now) / 1000);
  let days = Math.floor(ms / 86400);
  let hours = Math.floor((ms % 86400) / 3600);
  let minutes = Math.floor(((ms % 86400) % 3600) / 60);
  let seconds = ((ms % 86400) % 3600) % 60;

  return format
    .replaceAll("{d}", days)
    .replaceAll("{h}", hours)
    .replaceAll("{min}", minutes)
    .replaceAll("{sec}", seconds);
}


async function saveMedia(data, mimetype, path) {
    let mime = mimetype.split("/");
    let media = data;
    path = path ? path : `./tmp/${mime[0]}_${Date.now()}.${mime[1]}`;    

    if (!media) {
        return { status: false, msg: "Can't find data!" };
    }

    try {
        await fs.writeFileSync(path, media, "base64");
        return { status: true, path: path };
    } catch (err) {
        return { status: false, msg: err.message };
    }
}

async function pomf(path) {
  try {
    const fileStream = fs.createReadStream(path);
    const formData = new FormData();
    formData.append('files[]', fileStream);

    const response = await axios.post('https://pomf.lain.la/upload.php', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return { status: true, url: response.data.files[0].url };
  } catch (error) {
    console.log("Error at pomf uploader in lib/utils.js:", error)
    return { status: false, msg: error.message };
  }
}

module.exports = {
    saveMedia,
    pomf,
    parseUnix,
    parseTime,
    uptime: uptime,
    ucapan: ucapan,
    formatBytes: formatBytes,
    parseCmd: parseCmd,
    cpu: cpu,
    simi: simi,
    random: random,
    randomText: randomText
}