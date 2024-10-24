import jwt from "jsonwebtoken";

interface IAuthService {
  authUser(email: string, password: string, _id: string): string;
  verifyToken(token: string): boolean;
  invalidateToken(token: string): string;
  options: IAuthOptions;
}

type IAuthOptions = {
  expiresIn?: string | number;
  algorithm?: jwt.Algorithm;
  secret: string;
};

class AuthService implements IAuthService {
  options: IAuthOptions;
  secret: string;

  constructor(options: IAuthOptions) {
    this.options = options;
    this.secret = options.secret;
  }

  public authUser(email: string, _id: string): string {
    let options: jwt.SignOptions = {};
    if (this.options.expiresIn) {
      options.expiresIn = this.options.expiresIn;
    }
    if (this.options.algorithm) {
      options.algorithm = this.options.algorithm;
    }

    const token = jwt.sign(
      {
        email,
        _id,
      },
      this.secret,
      options
    );
    return token;
  }

  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token, this.secret);
      return true;
    } catch (error) {
      return false;
    }
  }

  public invalidateToken(token: string): string {
    const newToken = jwt.sign(
      {
        email: "",
        _id: "",
      },
      this.secret,
      { expiresIn: "0s" }
    );
    return newToken;
  }
}

export default AuthService;
