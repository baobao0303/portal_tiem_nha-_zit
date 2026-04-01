import { GetAllTaskRequest, GetAllTaskResponse } from '@application/messages';
import { Injectable } from '@angular/core';
import { ITaskReadableRepository } from '@core/domain';
import { ReadableRepository } from '../readable.repository';
import { ResponseMapper } from '@core/base';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskReadableRepository extends ReadableRepository implements ITaskReadableRepository {
  getAll(request: GetAllTaskRequest): Observable<GetAllTaskResponse[]> {
    //TODO: call API
    return this.findAll('./task.mock.json').pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllTaskResponse).map(item))),
    );
  }
}
