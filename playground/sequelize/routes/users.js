const router = require('express').Router();
const Sequelize = require('sequelize');
const User = require('../models/User');
const CONN = require('../connection/mysqlconn');

router.get('/',(req,res)=>{
    res.send('Funciona!');
})

router.get('/findall',async(req,res)=>{
    // User.findAll().then(users=>{
    //     res.send(users);
    // })
    try {
        const users = await User.findAll();
        res.send(users);
    }catch(err){
        res.status(500).send();
    }
});

router.get('/findall/where', async (req, res) => {

    try {
        const users = await User.findAll({
            where: {
                firstName: "John"
            }
        });
        res.send(users);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/findbyid/:id',async(req,res)=>{
     try {
         const users = await User.findById(req.params.id);
         if(!users) return res.status(404).send({
             status: 404,
             message: `No existen usuarios con ese id ${req.params.id}`
         })
         res.send(users);
     } catch (err) {
         res.status(500).send();
     }
})

router.get('/findall/sql',(req,res)=>{
    CONN.query('SELECT * FROM users').then(users=>{
        res.send(users);
    }).catch(err=>{
        res.status(500).send(err);
    });
})

router.get('/operators',(req,res)=>{
    const {Op}= Sequelize;
    User.findAll({
        where: {
            firstName: {
                [Op.and]: [
                    {[Op.like]: '__h%'},
                    
                ]
            }
        }
    }).then(users=>{
        res.send(users);
    })
})

router.get('/findorcreate',(req,res)=>{
    User.findOrCreate({
        where: {firstName: 'Adrian'},
        defaults: {lastName: 'Rosello'}
    }).spread((user,created)=>{
        res.send({
            user,
            created
        });
    })
})

router.get('/countall',(req,res)=>{
    User.findAndCountAll({
        limit: 2,
        offset: 1,
        order: [['firstName', 'ASC'],['id', 'DESC']]
    }).then(total=>{
        res.send(total);
    })
})

router.get('/countall2',(req,res)=>{
    User.findAndCountAll({
        limit: 3,
        offset: 0,
        group: ['firstName','id']

    }).then(total=>{
        res.send(total);
    })
})

router.get('/max', (req, res) => {
    User.max('id').then(max=>{
        res.send({max});//hay que poner el max como objeto para que no de error, ya que espera un objeto y si pusieramos como variable le llegaria un numero(6)
    })
})

router.get('/min', (req, res) => {
   User.min('id').then(min=>{
       res.send({min});
   })
})

router.get('/sum',(req,res)=>{
    User.sum('id').then(total=>{
        res.send({total})
    })
})

router.get('/create', (req, res) => {
    User.create({
        firstName: 'Juan',
        'lastName': 'Antonio'
    }).then(user=>{
        res.send(user)
    })
})

router.get('/bulkcreate', (req, res) => {
    User.bulkCreate([{
        firstName: 'Roberto',
        'lastName': 'Rios'
    },{
        firstName: 'Jose',
        lastName: 'Gutierrez'
    }]).then(user=>{
        return User.findAll();
    }).then(users=>{
        res.send(users);
    })
})

router.get('/findone/update', (req, res) => {
    User.findOne({
        where: {firstName: 'Roberto'}
    }).then(user=>{
        user.updateAttributes({
            lastName: 'Garcia'
        })
    })
})

router.get('/update',(req,res)=>{
    User.update({
        firstName: 'Alberto'
    },{
        where: {firstName: 'Roberto'}
    }
    ).then(users=>{
        res.send(users);
    })
})

router.get('/delete',(req,res)=>{
    User.destroy({
        where: {firstName: 'Alberto'}
    }).then(()=>{
        res.send('Se borrado con exito');
    }).catch(err => res.status(403).send(err))
})

// const obj = {
//     val: 'miValor'
// }

// const newObj = {
//     [obj.val]: 'x'
// }

// console.log(newObj);
module.exports = router;