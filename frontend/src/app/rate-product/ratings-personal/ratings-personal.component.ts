import { Component, Input, OnInit, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';
import { catchError, EMPTY } from 'rxjs';
import { RatingResponseDTO, RatingsService } from 'src/api-client';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ratings-personal',
  templateUrl: './ratings-personal.component.html',
  styleUrls: ['./ratings-personal.component.scss'],
  imports: [IonButton, IonIcon],
})
export class RatingsPersonalComponent implements OnInit {
  @Input() productId!: string;
  readonly rating = signal<RatingResponseDTO | undefined>(undefined);
  readonly displayedRating = signal<number>(0);
  status: 'PENDING' | 'DONE' = 'PENDING';

  constructor(
    private readonly ratingsService: RatingsService,
    private readonly toastController: ToastController,
  ) {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.ratingsService
      .ratingsControllerGetRating(this.productId)
      .pipe(
        catchError(() => {
          this.status = 'DONE';
          return EMPTY;
        }),
      )
      .subscribe((ratingResponseDTO) => {
        this.displayedRating.set(ratingResponseDTO.rating);
        this.rating.set(ratingResponseDTO);
        this.status = 'DONE';
      });
  }

  rateProduct(rating: number) {
    this.displayedRating.set(rating);
    this.ratingsService
      .ratingsControllerRate(this.productId, { rating })
      .pipe(
        catchError(() => {
          this.displayedRating.set(this.rating()?.rating ?? 0);
          this.toastController
            .create({
              message: 'Failed to rate product. Please try again later.',
              position: 'bottom',
            })
            .then((toast) => {
              toast.present();
            });
          return EMPTY;
        }),
      )
      .subscribe((rating) => {
        this.rating.set(rating);
      });
  }
}
