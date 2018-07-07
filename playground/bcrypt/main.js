//const bcrypt = require('bcrypt');
const {genSalt,hash,compare} = require('bcrypt');
const saltRounds = 10; //aumentar tiempo rondas salt
const plainText = 'pass123';
const someOtherPlainText = 'anotherpass123';

const callbackPassCompare = (hash,text)=>{
    compare(text, hash, function(err,res){
        if(err) return console.log(err);
            console.log(text,(res ? '' : 'no'), 'coincide con', hash);
    })
}

const promisePassCompare = (hash,text = plainText)=>{
    compare(text,hash)
        .then(res=>{
            console.log(text, (res ? '' : 'no'), 'coincide con', hash);
        })
        .catch(err=>{
            console.log(err);
        })
}

const asyncPassCompare = async(hash,text=plainText)=>{
    try{
        const res = await compare(text,hash);
        //inserta en db
        console.log(text, (res ? '' : 'no'), 'coincide con', hash);
    }catch (err){
        console.log(err);
    }
}
//bcrypt.genSalt();
//bcrypt.hash();
genSalt(saltRounds, function(err,salt){
    //console.log(salt);
    hash(plainText, salt, (err,hash)=>{
        //console.log(hash);
    })
})

hash(plainText, saltRounds, (err,hash) =>{
    //console.log(hash);
    //callbackPassCompare(hash,plainText);
    //callbackPassCompare(hash,someOtherPlainText);
    promisePassCompare(hash);
    promisePassCompare(someOtherPlainText);
})
