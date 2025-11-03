import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../core/models/usuario.model';
import { Observable } from 'rxjs';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDivider
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  currentUser$!: Observable<LoginResponse | null>;
  isAuthenticated = false;
  userName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser;
    this.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.userName = `${user.nombre} ${user.apellidopaterno}`;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

  isVoluntario(): boolean {
    return this.authService.hasRole('ROLE_VOLUNTARIO');
  }

  isDonante(): boolean {
    return this.authService.hasRole('ROLE_DONANTE');
  }

  logout(): void {
    this.authService.logout();
  }

  navigateToProfile(): void {
    this.router.navigate(['/usuario/perfil']);
  }
}