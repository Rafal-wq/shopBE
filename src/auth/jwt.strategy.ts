import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/user.entity';

export interface JwtPayload {
  id: string; //nasz token zalogowania
}

function cookieExtractor(req: any): null | string {
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
  //jeżeli ciastko istnieje to wyciągamy je a jeżeli nie to null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      //w jaki sposób ma pobierać się nasze jwt, extractor czyli wyciąganie z ciastek
      secretOrKey:
        'swghnu%^(%%$%jhn h hnj ihiuhgy7&^*)hg jkbjhnh k uyg uyg ^^*&^&*%KJHNiuhnuih',
      //podpisujemy tym tekstem nasze jwt
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    //powyższa metoda mówi nam w jaki sposób zweryfikować, że to co mamy w jwt
    //faktycznie odpowiada jakiemuś użytkownikowi
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }
    const user = await User.findOne({
      where: {
        currentTokenId: payload.id,
      },
    });
    //powyżej jest wyszukiwanie użytkownika po tokenie, który został przesłany od klienta
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    //jeżeli takiego nie ma - zwracamy błąd
    done(null, user); //jeżeli wszystko poszło dobrze - to przepuszczamy
  }
}
