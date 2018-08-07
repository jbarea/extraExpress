const User = require('./models/user');
const mongoose = require('./connections/mongoose');

const usersData = [
    {
        username: 'jbarea',
        name: {
            first: 'Juan',
            last: 'Barea'
        },
        password: 'unapass1234',
        email: 'jbaarealopez@gmail.com'
    },
    {
        username: 'jbarea2',
        name: {
            first: 'Juan',
            last: 'Barea'
        },
        password: 'unapassrd1234',
        email: 'jbaarealopez2@gmail.com'
    },
    {
        username: 'werwer',
        name: {
            first: 'Jueren',
            last: 'Ber33ea'
        },
        password: 'unapass1234',
        email: 'jbaerterteopez@gmail.com'
    }
]
/* (async () => {//funcion asincrona que se ejecutara de forma automatica

})() */
//nuestro validator detectaria cualquier error a la hora de colocar ahi nuestro correo, como por ejemplo poner dos arrobas entre medias, etc...
const Init = async() => {
    try{
        await User.remove({})
        const user = await new User(usersData[0]).save();
        await new User(usersData[1]).save();
        const user2 = await new User(usersData[2]).save();

        User.findOne({
            username: 'jbarea'
        }).then(res => {
            res.findSimilarRoles().then(docs => {
                console.log(docs);
            })
        });
        
        const token = await user2.generateAuthToken();
        console.log(token);
        await user2.removeAuthToken(token);
        //user2.generateAuthToken();
            /* console.log(user.toObject());
            console.log(JSON.stringify(user)); */
    
            /* user2.username = 'otrousername';
            await user2.save();
            user2.password = 'otrapass';
            await user2.save(); */

        }catch(err) {
            console.log(err)
        }    
}

Init();

