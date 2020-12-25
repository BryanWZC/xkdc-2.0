// External modules
import axios from 'axios';

export default async function handleComicData(PAGE_NUM_ARR) {
    const comicNum = getComicNum();
    const data = await getComicData(comicNum);

    if (data.err) return (window.location.href = '/');

    PAGE_NUM_ARR[0] = data.num; // Current Comic Number
    PAGE_NUM_ARR[1] = await getMaxComicNum(); // Max Comic Number

    setComicImage(data);
    setComicTitle(data);
    setPageTitle(data);
    setDate(data);
    setTranscript(data);
    setViewCount(data); // let function run async to prevent UI blocking
}

function getComicNum() {
    const url = window.location.href;
    const comicNum = url.match(/\d+$/);
    return comicNum && comicNum[0];
}

async function getComicData(comicNum) {
    const data = comicNum
        ? (await axios.get(`/data/${comicNum}`)).data
        : (await axios.get('/data/current')).data;
    return data;
}

async function getMaxComicNum() {
    return (await axios.get('/data/maxComicNum')).data;
}

function setComicImage({ img, alt }) {
    const comicImg = document.getElementById('comic-img');
    comicImg.src = img;
    comicImg.alt = alt;
}

function setComicTitle({ safe_title }) {
    const comicTitle = document.getElementById('comic-title');
    comicTitle.textContent = safe_title;
}

function setPageTitle({ safe_title }) {
    document.title = `xkdc 2.0: ${safe_title}`;
}

function setDate({ year, month, day }) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(day);
    const dateStr = date.toDateString();
    document.getElementById('date').textContent = dateStr.replace(
        /^(\w+)\s(.+)\s(\d+)$/,
        '$1, $2, $3'
    );
}

function setTranscript({ transcript }) {
    const transcriptDesc = document.getElementById('transcript-desc');

    let newTranscript = transcript.replace(/\[(\[.+?\])\]/gi, '$1'); // Replace double brackets with single brackets
    newTranscript = newTranscript.replace(/\((\(.+?\))\)/gi, '$1'); // Replace double braces with single braces
    newTranscript = newTranscript.replace(/\{\{(.+)\}\}/gi, '$1'); // Gets rid of curly brackets
    newTranscript = newTranscript.replace(
        /\n ([0-9a-z\.\!\?\,]+)|\n([0-9a-z\.\!\?\,]+)/g,
        ' $1$2'
    ); // Removes unnecessary line-breaks
    newTranscript = newTranscript
        .replace(/\n\n/gi, '\n')
        .replace(/\n/gi, '\n\n'); // Normalizes line breaks

    transcriptDesc.textContent = transcript ? newTranscript : 'None.';
}

async function setViewCount({ num }) {
    const visits = (await axios.get(`/data/viewCount?comicNum=${num}`)).data
        .visits;
    const viewCount = document.getElementById('view-count');
    viewCount.textContent = visits;
}
