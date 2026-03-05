import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
    products: any[] = [];
    message: string = '';
    loading: boolean = true;
    cartCount: number = 0;

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
        this.loadProducts();
        this.loadCartCount();
    }

    loadProducts(): void {
        this.loading = true;
        this.http.get<any[]>('/shop/products').subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading products:', err);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadCartCount(): void {
        this.http.get<any[]>('/shop/cart?cartId=' + this.getCartId()).subscribe({
            next: (data) => {
                this.cartCount = data.length;
                this.cdr.detectChanges();
            }
        });
    }

    addToCart(product: any): void {
        const body = {
            cartId: this.getCartId(),
            product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description
            }
        };
        this.http.post<any>('/shop/add-to-cart', body).subscribe({
            next: (data) => {
                this.cartCount = data.cart.length;
                this.message = '"' + product.name + '" added to cart!';
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.message = '';
                    this.cdr.detectChanges();
                }, 5000);
            },
            error: (err) => {
                console.error('Error adding to cart:', err);
            }
        });
    }

    goToCart(): void {
        this.router.navigate(['/cart']);
    }
}
