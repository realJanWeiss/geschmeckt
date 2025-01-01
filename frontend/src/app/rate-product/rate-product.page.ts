import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { ProductResponseDTO, ProductsService } from 'src/api-client';
import { catchError, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RatingsPersonalComponent } from './ratings-personal/ratings-personal.component';

@Component({
  selector: 'app-rate-product',
  templateUrl: './rate-product.page.html',
  styleUrls: ['./rate-product.page.scss'],
  standalone: true,
  imports: [
    RatingsPersonalComponent,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RateProductPage implements OnInit {
  private productEan!: string;
  readonly product = signal<ProductResponseDTO | undefined>(undefined);
  readonly productImage = computed<string | undefined>(() => {
    if (!this.product()) return;
    return `${environment.baseUrlApi}/static/${this.product()!.id}.jpg`;
  });
  status?: 'PENDING' | 'NOT_FOUND' | 'FAILED' = 'PENDING';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService,
  ) {}

  ngOnInit() {
    this.productEan = this.route.snapshot.paramMap.get('ean') as string;
    this.productsService
      .productsControllerGetProduct(this.productEan)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            this.status = 'NOT_FOUND';
          } else {
            this.status = 'FAILED';
          }
          return EMPTY;
        }),
      )
      .subscribe((product) => {
        this.product.set(product[0]);
      });
  }
}
