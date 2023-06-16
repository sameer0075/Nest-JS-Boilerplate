import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
     const request = context.switchToHttp().getRequest();
     const allowUnauthorizedRequest = this.reflector.get<boolean>('allowUnauthorizedRequest', context.getHandler());
    function indexFind(value) {
        return value == 'Authorization';
    }
    if(allowUnauthorizedRequest) {
        return allowUnauthorizedRequest
    } else {
        let index = request.res.req.rawHeaders.findIndex(indexFind)
        if(index != -1) {
          const bearerToken = request.res.req.rawHeaders[index+1]
          const token = bearerToken.slice(7)
          var decoded: any = jwt_decode(token);
          if(decoded && decoded.role_id == 1) {
            return true
          } else {
            return false
          }
        } else {
            return false
        }
    }
  }
}