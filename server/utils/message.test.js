var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'QWERTY';
    var text = "Some message";
    var message = generateMessage(from, text);


    expect(message.createdAt).toBeA("number"); // works in specific expect version
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Syed';
    var url = 'https://www.google.com/maps?q=15,19';
    var location = generateLocationMessage(from, 15, 19);

    expect(location.createdAt).toBeA("number");
    expect(location).toInclude({from,url});
  });
});
