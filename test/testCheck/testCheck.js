var chakram = require('chakram');
var fs = require("fs");
require('dotenv').config();
var expect = chakram.expect;

var binurl = 'https://requestb.in/api/v1/bins/yq5t0yyq/requests';

describe("Check Message Status Test", function() {
    console.log(process.ENV.API);
    var messageId = " ";
    var data = fs.readFileSync('random.db');
    messageId = data.toString();
    var checkMessageId = messageId.replace('-', '/');

    it("Should be able to get a notification", function () {
        return chakram.get(binurl)
            .then(function (binResponse) {
                var responseBody = binResponse.body[0].body;
                var responseJSON = JSON.parse(responseBody);
                var requestBinMessageId = responseJSON.messageId;
                //console.log("Message ID from Request bin : "+ requestBinMessageId);
                //console.log("Message ID from File        : "+ checkMessageId);
                expect(binResponse).to.have.status(200);
                expect(responseBody).to.contain("DELIVRD");
                expect(responseBody).to.contain(checkMessageId);
                return chakram.wait();
            })
    })
});