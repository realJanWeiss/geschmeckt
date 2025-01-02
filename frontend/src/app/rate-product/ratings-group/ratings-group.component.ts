import { Component, computed, Input, OnInit } from '@angular/core';
import { RatingResponseDTO, RatingsService } from 'src/api-client';
import { GroupService } from 'src/app/api/group.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import {
  IonItemDivider,
  IonBadge,
  IonItem,
  IonItemGroup,
  IonLabel,
} from '@ionic/angular/standalone';

interface GroupedRatings {
  ratings: RatingResponseDTO[];
  name: string;
  id: string;
}

@Component({
  selector: 'app-ratings-group',
  templateUrl: './ratings-group.component.html',
  styleUrls: ['./ratings-group.component.scss'],
  imports: [IonItemDivider, IonBadge, IonItemGroup, IonItem, IonLabel],
})
export class RatingsGroupComponent implements OnInit {
  @Input() productId!: string;
  status: 'PENDING' | 'DONE' = 'PENDING';

  constructor(
    private readonly ratingsService: RatingsService,
    private readonly groupService: GroupService,
  ) {}

  ngOnInit() {
    if (!this.groupService.groups().length) {
      this.groupService.fetchGroups().subscribe();
    }
  }

  private groupRatings = computed<Observable<GroupedRatings>[]>(() => {
    return this.groupService.groups().map((group) =>
      this.ratingsService
        .ratingsControllerGetRatings(group.id, this.productId)
        .pipe(
          map((response) => ({
            ratings: response,
            name: group.name,
            id: group.id,
          })),
        ),
    );
  });

  ratings = toSignal<GroupedRatings[]>(
    toObservable(this.groupRatings).pipe(
      switchMap((observables) => combineLatest(observables)),
    ),
  );
}
