const formatDate = (date = new Date()) => {
    return date.toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
        .slice(0, 19); // Format: YYYY-MM-DD HH:MM:SS
};

const getCurrentTimestamp = () => {
    return formatDate();
};

module.exports = {
    formatDate,
    getCurrentTimestamp
};