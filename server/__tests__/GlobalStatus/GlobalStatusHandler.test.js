const request = require('supertest')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUGF2aXRocmFuIiwiZW1haWwiOiIyMDIxY3NiMTA4OEBpaXRycHIuYWMuaW4iLCJpZCI6IjY2MDQzODM4MzZhNTJhZjhmNjdlY2MxMCIsImlhdCI6MTcxMzI2Njk2MCwiZXhwIjoxNzEzMzUzMzYwfQ.PlEHLKgoMY8bkaGUAXKEUSGnaithazu-P7TKPVmagQg"
describe('Adding Global available satus for a user for an Ngo', () => {
    test('Return error if user id is missing', async () => {
        const packet = { 
            ngo_id :  "65f04de683c50c03dfd91263",  
            token:token 
        };
        const res = await request("http://localhost:8080").post('/global/available').send(packet)
        console.log(res.body);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing USER ID');
    });
    test('Return error if ngo id is missing', async () => {
        const packet = { 
            user_id :  "65f04de683c50c03dfd91263",
            token:token   
        };
        const res = await request("http://localhost:8080").post('/global/available').send(packet)
        console.log(res.body);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Missing NGO Id');
    });
    test('Successfully added status of a user for an Ngo', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            user_id: '65da117c2216111bff5d0b44' ,
            token:token           };
        const res = await request("http://localhost:8080").post('/global/available').send(packet)
        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User Global status marked to available');
    });
    test('Return if status is already marked as available', async () => {
        const packet = {
            ngo_id: '65da11a82216111bff5d0bae',
            user_id: '65da117c2216111bff5d0b44' ,
            token:token           };
        const res = await request("http://localhost:8080").post('/global/available').send(packet)
        console.log(res.body);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User already marked as available ');
    });
    
 
});
