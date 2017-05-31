const getSeason = () => {
    let month = (new Date().getMonth() + 1).toString();
    let season = '';
    switch(month) {
        case '12':
        case '1':
        case '2':
            season = 'winter';
        break;
        case '3':
        case '4':
        case '5':
            season = 'spring';
        break;
        case '6':
        case '7':
        case '8':
            season = 'summer';
        break;
        case '9':
        case '10':
        case '11':
            season = 'fall';
        break;
    }
    season = (season[0].toUpperCase() + season.slice(1, season.length) + ' ' + (new Date().getFullYear())).toString();
    return season;
};

const getTime = () => {
    return new Date().getHours() + ':' + new Date().getMinutes() + ' ' + (new Date().toLocaleTimeString().slice(9, 11));
}

module.exports = {
    getSeason,
    getTime,
}


