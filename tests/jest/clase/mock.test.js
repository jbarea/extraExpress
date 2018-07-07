//import moment from 'moment';

describe('Mock de funciones', () => {
    test('mockName() .getMockName()',()=>{
        const mock = jest.fn();

        //expect(mock).toBe(123);
        mock.mockName('miFuncion');
        expect(mock.getMockName()).toBe('miFuncion');
        //expect.addSnapshotSerializer(mock).toHaveBeenCalledTimes(1);
    })

    test('.toHaveBeenCalledWith()',()=>{
        const mock = jest.fn();
        mock(undefined);
        expect(mock).toHaveBeenCalledWith(undefined);
        
        mock(10);
        expect(mock).toHaveBeenCalledWith(10);
        expect(mock).toHaveBeenCalledWith(undefined);

        
        expect(mock).toHaveBeenCalledWith(expect.any(Number));
        expect(mock).not.toHaveBeenCalledWith(expect.any(String));

        mock('MiString');
        expect(mock).toHaveBeenCalledWith(expect.any(String));
    })

    test('toHvaeBeenLastCalledWith()',()=>{
        const mock = jest.fn();
        mock(1);
        mock('cadena');

        expect(mock).toHaveBeenLastCalledWith('cadena');
        expect(mock).not.toHaveBeenLastCalledWith(1);
    })

    test('toHaveBeenCalledTimes()',()=>{
        const mock = jest.fn();
        mock();

        expect(mock).toHaveBeenCalledTimes(1);
        mock();
        expect(mock).toHaveBeenCalledTimes(2);
        expect(mock).not.toHaveBeenCalledTimes(1);
    })

    test('.mockReturnValueOnce()',()=>{
        const mock = jest.fn();

        mock.mockReturnValueOnce(10)
            .mockReturnValueOnce('test');

        expect(mock()).toBe(10);
        expect(mock()).toBe('test');

        expect(mock()).toBe(undefined);
        expect(mock()).toBeFalsy();
    })

    test('.mockReturnValue()',()=>{
        const mock = jest.fn();
        mock.mockReturnValueOnce(1)
            .mockReturnValue(2);
        
        expect(mock()).toBe(1);
        expect(mock()).toBe(2);
        expect(mock()).toBe(2);
    })

    test('jest.fn().mock.calls',()=>{
        const mockFilter = jest.fn();

        //mockFilter(1000);
        //console.log(mockFilter.mock.calls);

        mockFilter.mockReturnValueOnce(true)
                .mockReturnValueOnce(false);

        const result = [11,22].filter(mockFilter);

        expect(result).toEqual([11]);
        //filter arguments:
        //[value,index,[array completo]]
        //console.log(mockFilter.mock.calls);
        expect(mockFilter.mock.calls).toEqual([ //con este ultimo expect hacemos lo que haria el filter, pero a mano.
            [11,0,[11,22]],
            [22,1,[11,22]]
        ])
    })

    test('Mock libreria "moment"', () => {
        const moment = require("moment")
        const mockMoment = jest.fn(moment);

        const hoy = mockMoment('1971-01-01');
        console.log(hoy.format('DD-MM-YY'));
        //console.log(hoy.valueOf());
        const tomorrow = hoy.add(1,'day');
        console.log(tomorrow.format('DD-MM-YY'));

        expect(mockMoment).toHaveBeenCalled();
        expect(mockMoment).toHaveBeenCalledTimes(1);
        expect(mockMoment).toHaveBeenLastCalledWith('1971-01-01');//expect(mockMoment.mock.calls[mockMoment.mock.calls.length-1]) seria su equivalente sin usar el to havebeencalledwith
    })

    test('jest.fn().mock.instances',()=>{
        let MiMock = jest.fn();
        MiMock.mockImplementation(function(){
            this.nombre = 'test';
            this.miFuncion = jest.fn((str = 'Funciona!!!')=>{
                return 'bar';
            })
        })

        let instanciaMock = new MiMock();
        instanciaMock.miFuncion('Prueba');

        expect(MiMock.mock.instances.length).toBe(1);
        expect(MiMock.mock.instances[0]).toBe(instanciaMock);
        expect(MiMock.mock.instances[0].miFuncion).toHaveBeenCalled();
        
        expect(MiMock.mock.instances[0].miFuncion).toHaveBeenCalledWith('Prueba');
        expect(MiMock.mock.instances[0].miFuncion).not.toHaveBeenCalledWith('Funciona!!!');
        expect(MiMock.mock.instances[0].nombre).toBe('test');

        let segundaInstancia = new MiMock();
        expect(MiMock.mock.instances[1].nombre).toBe('test');
        expect(MiMock.mock.instances.length).toBe(2);
        expect(segundaInstancia.miFuncion('una string')).toBe('bar');
    })

    test('.mockImplementation/Once',()=>{
        const miMock = jest.fn();

        miMock.mockImplementationOnce(callback=>callback(null,true))
            .mockImplementationOnce(callback => callback(null, false))
            .mockImplementation(callback => callback(null, 'Respuesta predeterminada'));

        expect(miMock((error,response)=>response)).toBe(true);
        expect(miMock((error, response) => response)).toBe(false);
        expect(miMock((error, response) => response)).toBe('Respuesta predeterminada');
        expect(typeof miMock((error,response)=>response)).toBe('string');
    })
})