var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'QWERTY';
    var text = "Some message";
    var message = generateMessage(from, text);


    expect(message.createdAt).toBeA("number"); // works in specific expect version
    expect(message).toInclude({from,text});
  });
});
