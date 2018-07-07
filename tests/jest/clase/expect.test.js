const expect = require('expect');
//mocha no hace falta declararlo, se coloca el de forma automatica
//para jest sustituiremos los it por test
console.log('Funciona');

describe("bloque de tests con expect y mocha", ()=>{
    describe('Primeras pruebas',()=>{
        it('Comprueba que funcionan los test', () => {//it should return.....
            const error = false;
            if(error) throw new Error('No ha funcionado el test');
            else{

            }
        })
    })

    describe('.toBe()',()=>{
        it('Comprueba si son iguales',()=>{
            const numero = 10;
            expect(10).toBe(10);
            expect(typeof(numero)).toBe('number');
            expect([10,11][0]).toBe(10);
        })

        it('Comprueba si no son iguales', () => {
            const numero = 10;
            expect(10).not.toBe(11);
            expect(typeof (numero)).not.toBe('string');
            expect([10, 11][0]).not.toBe(11);
        })
    })

    describe('.toEqual()',()=>{
        it('Comparando Array',()=>{
            const arr = [10,20,'string',{}];
            expect(arr).toEqual([10,20,'string',{}]);
            expect(arr).not.toEqual([11,20,'string',{}]);
        })

        it('Comparando Objetos',()=>{
            const obj = {
                test: true,
                foo: 'bar'
            }

            expect(obj).toEqual({
                test:true,
                foo: 'bar'
            })

            expect(obj).not.toEqual({
                test: false,
                foo: 'bar'
            })
        })
    })

    it('.toHaveLength',()=>{
        let arr = [];
        expect(arr).toHaveLength(0);
        expect(arr.length).toBe(0);

        arr.push(0);
        expect(arr).not.toHaveLength(0);
    })

    describe('.toBeTruthy() .toBeFalsy()',()=>{
        it('Comprobando si existe',()=>{
            expect(true).toBeTruthy();
            expect(false).toBeFalsy();
            expect({name: 'ivan'}).not.toBeFalsy();
        })

        it('Comprobando si no existe',()=>{
            expect(null).toBeFalsy();
            expect(undefined).not.toBeTruthy();
        })
    })

    describe('Comparaciones numeros',()=>{
        it('.toGreaterThen() . toBeGreaterThanOrEqual()',()=>{
            const numero = 100;
            expect(numero).toBeGreaterThan(99);
            expect(numero).not.toBeGreaterThan(100);
            expect(numero).toBeGreaterThanOrEqual(100);
        })

        it('.toLessThen() . toBeLessThanOrEqual()', () => {
            const numero = 100;
            expect(numero).toBeLessThan(110);
            expect(numero).not.toBeLessThan(100);
            expect(numero).toBeLessThanOrEqual(100);
        })

        it('toBeClose(num,numeroDecimalesPrecision)',()=>{
            const suma = (0.2 + 0.1);
            expect(suma).not.toBe(0.3);
            expect(suma).toBeCloseTo(0.3,12);
            expect(suma).not.toBeCloseTo(0.3,100);
        })

        it('.toBeDefined() .toBeUndefined()',()=>{
            let miVariable;

            expect(miVariable).toBeUndefined();
            expect(miVariable).not.toBeDefined();

            miVariable = true;

            expect(miVariable).not.toBeUndefined();
            expect(miVariable).toBeDefined();
        })    
    })

    it('.toMatch()',() => {
        let miCadena = 'Cadena a evaluar n12';

        expect(miCadena).toMatch('Cadena a evaluar n12');
        expect(miCadena).toMatch(/^Cadena a evaluar n12$/);
        miCadena += '@';
        expect(miCadena).not.toMatch(/^Cadena( a )?[a-z,A-Z,0-9, ]+$/);

        miCadena = 'Cadena evaluar n12';
        expect(miCadena).toMatch(/^Cadena( a )?[a-z,A-Z,0-9, ]+$/);
    })

    describe('Objetos',()=>{
        it('toMatchObject()',()=>{
            const obj = {
                foo: 'bar',
                test: true,
                x: 1
            }

            expect(obj).toMatchObject({foo: 'bar',test: true});
            expect({foo: 'bar', test:true}).not.toMatchObject(obj);
        })

        it('toMatchObject en Arrays',()=>{
            const objArr = [{foo:'bar',test:true},{test:true}];

            expect(objArr).not.toBe([{ foo: 'bar' }, { test: true }]);
            expect(objArr).not.toEqual([{ foo: 'bar' }, { test: true }]);
            expect(objArr).toMatchObject([{ foo: 'bar' }, { test: true }]);//para comparar y solo lo haga con los valores especificados
        })

        it('.toHaveProperty()',()=>{
            const obj = {
                foo: 'bar',
                test: true
            };

            expect(obj).toHaveProperty('test');
            delete obj.test;
            expect(obj).not.toHaveProperty('test');
            expect(obj).toHaveProperty('foo','bar');
            expect(obj).not.toHaveProperty('foo','bar2');
        })
    })
})