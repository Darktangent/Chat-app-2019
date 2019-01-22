const expect=require("expect");
let {Users}=require("./users")
describe("Users",()=>{
  let users;
  beforeEach(()=>{
    users=new Users()
    users.users=[{
      id:'1',
      name:"Mike",
      room:"Family"

    },
    {
      id:'2',
      name:"Corrie",
      room:"Family"

    },
    {
      id:'3',
      name:"Rambo",
      room:"Family"

    }

  ]
  })
  it("should create a new user",()=>{
    let users=new Users();
    let user={
      id:'123',
      name:'Rohan',
      room:"Office fans"
    };
    let resUser=users.addUser(user.id,user.name,user.room);
    expect(users.users).toMatchObject([user])
  })
  it("should return names for node course",()=>{
    let userList=users.getUserList('Family')
    expect(userList).toMatchObject(['Mike','Corrie','Rambo'])

  })
  it("should find user",()=>{
    let userId='2'
    let user=users.getUser(userId);
    expect(user.id).toBe(userId)
  })
  it("should not find user",()=>{
    let userId='10'
    let user=users.getUser(userId);
    expect(user).toBeFalsy();
  })
  it("should remove a user",()=>{
    let userId='1'
    let user=users.removeUser(userId);
    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })

})
