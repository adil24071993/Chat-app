var moment = require('moment');

var currentTimeStamp = moment().valueOf();

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: currentTimeStamp
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: currentTimeStamp
  }
};
module.exports = {
  generateMessage,
  generateLocationMessage
};
