import { authUser } from "@services/authService";

describe("Service user authentification", ()=>{
    test('authentification user', ()=>{
        expect(authUser()).toBe("user authentificated");
    })
})