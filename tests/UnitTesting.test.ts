
import  { functions }  from '../src/UnitTesting'
//const MockFunction = jest.mock('./src/UnitTesting')

test('Api test for Objects', async () => {
    try {
        expect.assertions(3);
        const result = await functions.fetchUser()
        expect(result).toHaveProperty('username')
        expect(result).toHaveProperty('username', "Bret")
        expect(result).toMatchObject({'username': "Bret"})
    } catch (e) {
        expect(e).toEqual({
            error: e,
        });
    }
})

test('Api test for Array', async() => {
    try {
        expect.assertions(1)
        const result = await functions.fetchUserArray()
        expect(result).toHaveLength(10)
    } catch (e) {
        expect(e).toEqual({
            error: e,
        });
    }
})

//   test('snapShot', () => {
//     expect(functions).toMatchSnapshot()
//   });

//snap shot test will be available un react u can update npm test -- -u
test('toBe Called', () => {    
    //const fn = jest.fn((x,y) => x+ y)
    const fn = jest.fn(functions.add)
    const x = 2;
    const y = 3;
    expect(fn(x,y)).toBe(x+y)
    expect(fn).toHaveBeenCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(x,y)
    expect(fn).toBeCalled()
    //expect(fn).not.toBeCalled()
    expect(fn).toHaveBeenLastCalledWith(x,y)
    expect(fn).toHaveReturnedTimes(1)
    expect(fn).toHaveReturnedWith(x+y)
    expect(fn).toHaveLastReturnedWith(x+y)
 
})


test('toBe equal', () => {
    expect(functions.add(2,2)).toBe(4)
})

test('toBe not equal', () => {
    expect(functions.add(2,2)).not.toBe(5)
})

test('should be null', () => {
    expect(functions.isNull()).toBeNull()
})

test('should be falsy', () => {
    expect(functions.checkValue(0)).toBeFalsy() //exectutes for 0,null,undefined , for truthy .not.toBeFalsy()
})

test('should be truthy', () => {
    expect(functions.checkValue(true)).toBeTruthy() //not exectutes for 0, fasle, etc,,  , for truthy .not.toBeFalsy()
})

test('should be Object', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'js',
        lastName: 'jest'
    })
})

test('to be less than ', () => {
    expect(functions.add(500, 400)).toBeLessThan(1000) //toBeLessThanOrEqual
})

test('to check the Regex', () => {
    expect('team').not.toMatch(/I/) 
})

test('to check the array ', () => {
    const names = ['user', 'test', 'admin']
    expect(names).toContain('admin')
})


test('check the reverse works or not', () => {
    expect(functions.reverseString('hello')).toEqual('olleh')
})
