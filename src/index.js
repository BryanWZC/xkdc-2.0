// Internal modules
import handleComicData from './handleComicData';
import handleDarkLightMode from './handleDarkLightMode';
import handleNavOnClicks from './handleNav';

const COMIC_NUM_ARR = [0, 0]; // Current comic number and Max comic number

handleDarkLightMode(); // Uses session storage to determine mode
handleComicData(COMIC_NUM_ARR).then((res) => handleNavOnClicks(COMIC_NUM_ARR)); // handleNavClicks needs to wait on Max page number in arr
