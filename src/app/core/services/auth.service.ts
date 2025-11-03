import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest, LoginResponse, Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api';
    private currentUserSubject: BehaviorSubject<LoginResponse | null>;
    public currentUser: Observable<LoginResponse | null>;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoginResponse | null {
        return this.currentUserSubject.value;
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/autenticar`, credentials, {
            observe: 'response',
            withCredentials: true
        }).pipe(
            map(response => {
                const token = response.headers.get('Authorization');
                console.log(token)
                if (response.body && token) {
                    const user = { ...response.body, jwt: token };
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', token);
                    this.currentUserSubject.next(user);
                    return user;
                }
                throw new Error('Login failed');
            })
        );
    }

    register(usuario: Usuario): Observable<any> {
        return this.http.post(`${this.apiUrl}/usuario`, usuario);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.currentUserValue;
    }

    hasRole(role: string): boolean {
        const user = this.currentUserValue;
        return user ? user.roles.includes(role) : false;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}