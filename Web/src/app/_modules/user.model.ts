import { AuthModel } from "./auth.model";

export class UserModel extends AuthModel {
    id?: number;
    name?: string | undefined;
    email?: string;
    telefono?: string
    roles?: number[];

    setUser(user: any){
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.telefono = user.telefono;
        this.roles = user.roles || [];
    }
}