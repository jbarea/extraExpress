import app from '../../../playground/sequelize/app';
import request from 'supertest'

describe('GET /users/',()=>{
    describe("/findall", ()=>{ //valdrian tambien las simples
        test('deberia dar error 404',()=>{
            request(app)
            .get('/rutaInexistente')
            .expect(404)
            .end()
        })

        test('/findall',(done)=>{
            request(app)
            .get('/users/findall')
            .expect(200)
            .expect((res)=>{
                expect(res.body).toMatchObject(resFindAll);
                expect(res.headers['x-auth']).toBeFalsy();
            })
            .end((err,res)=>{
                if(err) return done(err);

                done();
            })
        })

        test('/users/findorcreate', (done)=>{
            request(app)
            .get('/users/findorcreate')
            .expect((err,res)=>{
                User.findOrCreate({
                    where: (firstName: 'Alberto'),
                    defaults: (lastName)
                })
            })
        })
    })
})
