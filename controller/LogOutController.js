const usersDB ={
    users : require('../model/user.json'),
    setUsers : function(data) { this.users =data}
}

const fsPromises =require('fs').promises;
const path = require('path');

const handleLogOut =async (req,res)=>{
    // on client , also delete the access token

    const cookies =req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken =cookies.jwt;

    const foundUser =usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly : true})
        return res.sendStatus(204); 
    } 

    // delete refresh token in db
    const otherUsers = usersDB.users.filter(person =>person.refreshToken !== foundUser.refreshToken);
    const currentUser ={...foundUser,refreshToken : ''};
    usersDB.setUsers([...otherUsers,currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname,'..','model','users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt',{httpOnly: true});
    res.sendStatus(204);
}
module.exports ={ handleLogOut };