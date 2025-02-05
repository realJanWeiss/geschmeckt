import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { GroupResponseDTO, GroupsService } from 'src/api-client';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  fetching = signal<boolean>(true);
  groups = signal<GroupResponseDTO[]>([]);

  constructor(private readonly groupsService: GroupsService) {}

  fetchGroups(): Observable<GroupResponseDTO[]> {
    this.fetching.set(true);
    return this.groupsService.groupsControllerGetGroupsForCurrentUser().pipe(
      tap((groups) => {
        this.groups.set(groups);
        this.fetching.set(false);
      }),
    );
  }

  createGroup(name: string): Observable<GroupResponseDTO> {
    return this.groupsService.groupsControllerCreate({ name }).pipe(
      tap((group) => {
        this.groups.update((groups) => groups.concat(group));
      }),
    );
  }

  joinGroup(groupId: string): Observable<GroupResponseDTO> {
    return this.groupsService.groupsControllerJoin(groupId).pipe(
      tap((group) => {
        this.groups.update((groups) => groups.concat(group));
      }),
    );
  }

  leaveGroup(groupId: string): Observable<GroupResponseDTO> {
    return this.groupsService.groupsControllerLeave(groupId).pipe(
      tap((group) => {
        this.groups.update((groups) => groups.filter((g) => g.id !== group.id));
      }),
    );
  }
}
