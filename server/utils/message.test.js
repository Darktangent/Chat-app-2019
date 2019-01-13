let expect=require("expect")
let {generateMessage,generateLocationMessage}=require('./message')

describe("generateMessage",()=>{
	it("should generate the correct message object",()=>{
	
		var	from="rohan";
		var	text="test";
		var	message=generateMessage(from,text);
		
		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({
			from,
			text
		})
	})

})
describe( "generateLocationMessage",()=>{
	it("should generate correct location object",()=>{
		var from="rohan"
		var lat=1
		var lng=1
		url=`https://www.google.com/search?q=${lat},${lng}`
		var message=generateLocationMessage(from,lat,lng)
		expect (typeof message.createdAt).toBe('number');
		expect (message).toMatchObject({
			from:from,
			url:url
		})
	})

})