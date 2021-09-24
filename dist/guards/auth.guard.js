"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../auth/user.model");
const mongoose_2 = require("mongoose");
let AuthGuard = class AuthGuard {
    constructor(userModel) {
        this.userModel = userModel;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    async validateRequest(req) {
        const token = req.headers['auth-token'].split(' ')[1];
        if (!token) {
            return false;
        }
        try {
            const jwtUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const userStored = await this.userModel.findById(jwtUser.id);
            if (!userStored) {
                throw new common_1.ForbiddenException('User no exits');
            }
            req.user = jwtUser;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid Token!!!');
        }
        return true;
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map