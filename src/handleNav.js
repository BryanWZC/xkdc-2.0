export default ([comicNum, maxComicNum]) => {
    function handleNext() {
        if (comicNum + 1 > maxComicNum) return;
        window.location.href = comicNum > 0 && `./${comicNum + 1}`;
    }

    function handlePrev() {
        if (comicNum - 1 < 1) return;
        window.location.href = comicNum > 0 && `./${comicNum - 1}`;
    }

    function handleRandom() {
        const randomComicNum = Math.floor(Math.random() * maxComicNum) + 1;
        window.location.href = `./${randomComicNum}`;
    }

    document.getElementById('button-next').onclick = handleNext;
    document.getElementById('button-prev').onclick = handlePrev;
    document.getElementById('button-random').onclick = handleRandom;
};
