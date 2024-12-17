import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

// import {
//   Injectable,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class GqlAuthGuard extends AuthGuard('jwt') {
//   constructor(private jwtService: JwtService) {
//     super();
//   }

//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const request = ctx.getContext().req;

//     const authorization = request.headers.authorization;
//     if (!authorization) {
//       throw new UnauthorizedException('Authorization header missing');
//     }

//     const token = authorization.replace('Bearer ', '');
//     try {
//       const payload = this.jwtService.verify(token);
//       request.user = payload;
//       return request;
//     } catch (err) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }
// }
