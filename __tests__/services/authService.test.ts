import AuthService from "@services/authService";


describe("AuthService", () => {
    const authService = new AuthService({secret: "1234"});

    test("generate token", () => {
        expect(authService.authUser("email", "id")).toBeDefined();
    });

    test("verify token", () => {
        const token = authService.authUser("email", "id");
        expect(authService.verifyToken(token)).toBe(true);
    });

    test("invalidate token", () => {
        const token = authService.authUser("email", "id");
        const newToken = authService.invalidateToken(token);
        expect(authService.verifyToken(newToken)).toBe(false);
    })
});