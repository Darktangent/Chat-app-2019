const moment=require("moment")

let generateMessage=(from,text)=>{
	return {
		from:from,
		text:text,
		createdAt:moment().valueOf()
	}
}
let generateLocationMessage=(from,latitude,longitude)=>{
	return{
		from,
		url:`https://www.google.com/search?q=${latitude},${longitude}`,
		createdAt:moment().valueOf()
	}
}
module.exports={generateMessage,generateLocationMessage};
