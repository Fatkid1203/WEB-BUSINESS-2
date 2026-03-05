import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: any[] = [];
    loading: boolean = true;

    constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

    getCartId(): string {
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            cartId = 'cart_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cartId', cartId);
        }
        return cartId;
    }

    ngOnInit(): void {
        this.loadCart();
    }

    loadCart(): void {
        this.loading = true;
        this.http.get<any[]>('/shop/cart?cartId=' + this.getCartId()).subscribe({
            next: (data) => {
                this.cartItems = data.map(item => ({
                    ...item,
                    selected: false
                }));
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading cart:', err);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getTotal(item: any): number {
        return item.price * item.quantity;
    }

    getGrandTotal(): number {
        let total = 0;
        for (let item of this.cartItems) {
            total += item.price * item.quantity;
        }
        return total;
    }

    updateCart(): void {
        const removeIds = this.cartItems
            .filter(item => item.selected)
            .map(item => item._id);

        const items = this.cartItems
            .filter(item => !item.selected)
            .map(item => ({ _id: item._id, quantity: item.quantity }));

        this.http.post<any[]>('/shop/update-cart', {
            cartId: this.getCartId(),
            removeIds: removeIds,
            items: items
        }).subscribe({
            next: (data) => {
                this.cartItems = data.map(item => ({
                    ...item,
                    selected: false
                }));
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error updating cart:', err);
            }
        });
    }

    continueShopping(): void {
        this.router.navigate(['/shop']);
    }
}
