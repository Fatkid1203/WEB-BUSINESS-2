import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    message: string = '';
    isError: boolean = false;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        // Read cookies from server on init
        this.http.get<any>('/auth/read-cookie').subscribe({
            next: (data) => {
                if (data.username) {
                    this.username = data.username;
                }
                if (data.password) {
                    this.password = data.password;
                }
            },
            error: (err) => {
                console.log('No saved cookies found');
            }
        });
    }

    onLogin(): void {
        this.http.post<any>('/auth/register', {
            name: this.username,
            password: this.password
        }).subscribe({
            next: (data) => {
                this.message = data.message;
                this.isError = false;
            },
            error: (err) => {
                this.message = err.error.message || 'Login failed';
                this.isError = true;
            }
        });
    }
}
