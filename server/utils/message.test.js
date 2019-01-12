let expect=require("expect")
let {generateMessage}=require('./message')

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