var chakram = require('chakram');
var fs = require("fs");
var expect = chakram.expect;

var url = 'https://slot2.apipractice.t-dev.telstra.net/v2/messages/sms';

var options = {
    headers: {
        'Authorization': 'Bearer bDCf51WV2V4f0SY7SkB9vRIbgrVz'
    }
};
var to = "0418120253";
//var to = "0472880996";
var body = "Randomeness goes here";
var notifyURL = "https://requestb.in/yq5t0yyq";

var s_data = { "to": to, "body": body, "notifyURL": notifyURL };

describe("Messaging API Test", function () {
    it("Should be able to send SMS", function () {
    return chakram.post(url, s_data, options)
            .then(function (apiResponse) {
                var responseBody = apiResponse.body;
                //console.log(responseBody);
                
                var stringResponse = JSON.stringify(responseBody);
                var messageId = responseBody.messages[0].messageId;
                var deliveryStatus = responseBody.messages[0].deliveryStatus;
                //console.log(deliveryStatus);
                
                //console.log("Message ID from API Response: " + messageId);
                
                expect(apiResponse).to.have.status(201);
                expect(stringResponse).to.contain("MessageWaiting");
                fs.writeFile('random.db', messageId, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
                return chakram.wait();
                //return chakram.get("https://requestb.in/api/v1/bins/yq5t0yyq/requests");
            })
        // .then(function (binResponse) {
        //     var checkMessageId = messageId.replace('-', '/');
        //     console.log("Message ID from API Response: "+ checkMessageId);                
        //     var responseBody = binResponse.body[0].body;
        //     var responseJSON = JSON.parse(responseBody);
        //     var requestBinMessageId = responseJSON.messageId;
        //     console.log("Message ID from Request bin : " + requestBinMessageId);
        //     expect(binResponse).to.have.status(200);
        //     //expect(responseBody).to.contain(checkMessageId);
        //     //expect(responseBody).to.contain("DELIVRD");
        //     //return chakram.wait();
        // })
    });
    it("Testing impossible delivery", function () {
        var s_data = { "to": "0472880996", "body": body, "notifyURL": notifyURL };
        
        return chakram.post(url, s_data, options)
            .then(function (apiResponse) {
                var responseBody = apiResponse.body;
                
                var stringResponse = JSON.stringify(responseBody);
                var messageId = responseBody.messages[0].messageId;
                var deliveryStatus = responseBody.messages[0].deliveryStatus;

                expect(apiResponse).to.have.status(201);
                expect(stringResponse).to.contain("DeliveryImpossible");

                return chakram.wait();
            })
    });

});

