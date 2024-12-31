import { Component, Input, OnInit, signal } from '@angular/core';
import { addIcons } from 'ionicons';
import { starOutline } from 'ionicons/icons';
import { catchError, EMPTY } from 'rxjs';
import { RatingResponseDTO, RatingsService } from 'src/api-client';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ratings-personal',
  templateUrl: './ratings-personal.component.html',
  styleUrls: ['./ratings-personal.component.scss'],
  imports: [IonButton, IonIcon],
})
export class RatingsPersonalComponent implements OnInit {
  @Input() productId!: string;
  readonly rating = signal<RatingResponseDTO | undefined>(undefined);
  status: 'PENDING' | 'DONE' = 'PENDING';

  constructor(private readonly ratingsService: RatingsService) {
    addIcons({ starOutline });
  }

  ngOnInit() {
    this.ratingsService
      .ratingsControllerGetRating(this.productId)
      .pipe(
        catchError(() => {
          return EMPTY;
        }),
      )
      .subscribe((rating) => {
        this.rating.set(rating);
      });
  }
}
