
let expect=require("expect")
let {isRealString}=require('./validation.js')

describe("isRealString",()=>{
  it('should reject non-string val',()=>{
    let res=isRealString(10)
    expect(res).toBe(false)
  })
  it ("should reject string with only space",()=>{
    let res=isRealString('      ');
    expect(res).toBe(false)
  })
  it("should allow string with non-space chars",()=>{
    let res=isRealString("hello there")
    expect(res).toBe(true)
  })
})
