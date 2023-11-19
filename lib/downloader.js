const axios = require("axios");
const ytdl = require("ytdl-core");
const ytsapi = require("yt-search");
const fbdlapi = require("@xaviabot/fb-downloader");
const { TiktokDL } = require("@tobyg74/tiktok-api-dl");
const { twitter } = require("btch-downloader");

async function ytv(url) {
    try {
        if(!ytdl.validateURL(url)) return { status: false, message: "Invalid url video!" };
        
        const dataVid = await ytdl.getInfo(url);
        const sortData = dataVid.formats.filter((format) => format.hasVideo && format.hasAudio).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const fileSize = dataVid.formats.filter((format) => format.qualityLabel === sortData[0].qualityLabel).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const thumbnail = dataVid.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
        const result = { status: true, videoInfo: { title: dataVid.videoDetails.title, description: dataVid.videoDetails.description, viewCount: dataVid.videoDetails.viewCount, videoId: dataVid.videoDetails.videoId }, thumbnails: thumbnail, media: sortData[0], mediaSize: fileSize[0].contentLength };
        return result;
    } catch(err) {
        return { status: false, message: err };;
    }
}

async function yta(url) {
    try {
        if(!ytdl.validateURL(url)) return { status: false, message: "Invalid url video!" };
        
        const dataVid = await ytdl.getInfo(url);
        const sortData = dataVid.formats.filter((format) => format.hasVideo == false && format.hasAudio == true).sort((a, b) => (b.width * b.height) - (a.width * a.height));
        const thumbnail = dataVid.videoDetails.thumbnails.sort((a, b) => b.width - a.width).find((thumbnail) => thumbnail.width > 1000 || thumbnail.width > 700 || thumbnail.width > 600 || thumbnail.width > 500 || thumbnail.width > 400 || thumbnail.width > 300 || thumbnail.width > 200 || thumbnail.width > 100);
        const result = { status: true, videoInfo: { title: dataVid.videoDetails.title, description: dataVid.videoDetails.description, viewCount: dataVid.videoDetails.viewCount, videoId: dataVid.videoDetails.videoId }, thumbnails: thumbnail, media: sortData[0], mediaSize: sortData[0].contentLength };
        return result;
    } catch(err) {
        return { status: false, message: err };;
    }
}

async function yts(query) {
    if(!query) return { status: false, message: "Please input the query!" };
    try {
        const res = await ytsapi(query);
        const list = res.all.filter(v => v.type === "video") || [];
        if(list.length === 0) return { status: false, message: "Can't find data!" };
        return { status: true, data: list };
    } catch (e) {
        return { status: false, message: e };
    }
}

async function igdl(url) {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const response = await axios.get(`https://vihangayt.me/download/instagram?url=${url}`);
        let data = response.data.data;
        if(data.data === undefined) return { status: false, message: "Invalid url instagram post!" };
        return { status: true, mediaCount: data.data.length, data: data.data };
    } catch (e) {
        return { status: false, message: e };;
    }
}

async function fbdl(url) {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const result = await fbdlapi(url);
        return { status: true, data: { post: result.url,caption: result.title, thumb: result.thumbnail, video: result.hd || result.sd }};
    } catch (e) {
        return { status: false, message: e };
    }
}

async function fbdlv2(url) {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const result = await axios.get(`https://vihangayt.me/download/fb?url=${url}`);
        const data = result.data.data;
        if(data === undefined) return { status: false, message: "Failed to get data!" };
        return { status: true, data: { post: url, caption: "", thumb: "https://pomf2.lain.la/f/fbv0lqzs.jpg", video: data.download[0].url }};
    } catch (e) {
        return { status: false, code: e.response.status, message: e.response.statusText };
    }
}

async function ttdl(url) {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const response = await TiktokDL(url, { version: "v1" });
        if(response.result === undefined) return { status: false, message: response.message };
        return { status: true, data: response.result };
    } catch (e) {
        return { status: false, message: e };
    }
}

async function twdl(url) {
    if(!url) return { status: false, message: "Invalid url!" };
    try {
        const result = await twitter(url);
        if((result.url[0].hd || result.url[0].sd) === undefined) return { status: false, message: "The url is invalid or the post is not a video!" };
        return { status: true, data: { caption: result.title, media: result.url[0].hd || result.url[0].sd } };
    } catch (e) {
        return { status: false, message: e };
    }
}

module.exports = {
    ytv,
    yta,
    yts,
    igdl,
    fbdl,
    fbdlv2,
    twdl,
    ttdl
}