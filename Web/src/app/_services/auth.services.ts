import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, catchError, finalize, map, Observable, of, Subscription } from "rxjs";
import { UserModel } from "../_modules/user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { URL_API } from "../config/config";

@Injectable({
    providedIn: "root",
})

export class AuthService implements OnDestroy{

    //private fields
    private unsubscribe: Subscription[] = [];

    //public fields
    currentUser$?: Observable<UserModel>;
    isLoading$: Observable<boolean> | undefined;
    currentUserSubject?: BehaviorSubject<UserModel>;
    isLoadingSubject: BehaviorSubject<boolean> | undefined;

    get currentUserValue(): UserModel {
        return this.currentUserSubject?.value ?? new UserModel();
    }
    
    set currentUserValue(user: UserModel) {
       this.currentUserSubject?.next(user);
    }

    user: any;
    token!: string;

    constructor(private http: HttpClient, private router: Router){
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();

        this.loadStorage();
    }

    private loadStorage(){
        if(localStorage.getItem("token")){
            this.token = localStorage.getItem("token");
            this.user = JSON.parse(localStorage.getItem("user"));
        } else{
            this.user = null;
            this.token = '';
        }
    }

    isLogued(){
        return (this.token.length > 5) ? true : false;
    }

    login(email:string, password: string){
        this.isLoadingSubject.next(true);
        
        let url = URL_API + "/users/login";

        console.log({email, password});

        return this.http.post(url, {email, password}).pipe(
            map((response:any) => {
                console.log(response);

                if(response && response.accessToken)
                    return this.setAuthFromLocalStorage(response);
                else
                    return response;
            }),
            catchError((error) => {
                console.error('error', error);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    logout(){
        this.user = null;
        this.token = null;
        localStorage.clear();
        this.router.navigate(['auth/login']);
    }

    private setAuthFromLocalStorage(obj: any): boolean {
        this.user = null;
        this.token = null;

        if(obj.accessToken && obj.user){
            localStorage.setItem("token", obj.accessToken);
            localStorage.setItem("user", JSON.stringify(obj.user));
            this.user = obj.user;
            this.token = obj.accessToken;

            return true;
        }

        return false;
    }

    register(obj: any){
        return this.http.post(URL_API + "/users/register", obj);

    }

    ngOnDestroy(): void {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}