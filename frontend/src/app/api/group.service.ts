import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GroupResponseDTO, GroupsService } from 'src/api-client';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  fetching = signal<boolean>(true);
  groups = signal<GroupResponseDTO[]>([]);

  constructor(private readonly groupsService: GroupsService) {}

  fetchGroups(): Observable<GroupResponseDTO[]> {
    this.fetching.set(true);
    return this.groupsService.groupsControllerGetGroupsForCurrentUser().pipe(
      tap(groups => {
        this.groups.set(groups);
        this.fetching.set(false);
      })
    );
  }
}
