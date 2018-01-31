var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'QWERTY';
    var text = "Some message";
    var message = generateMessage(from, text);

    console.log(message)
    expect(message.createdAt).toBe("number");
    expect(message).toInclude({from,text});
  });
});
