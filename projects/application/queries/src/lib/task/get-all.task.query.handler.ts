import { inject, Injectable } from '@angular/core';
import { RequestHandler } from '@application/base';
import { GetAllTaskRequest, GetAllTaskResponse } from '@application/messages';
import { TaskReadableRepository } from '@infrastructure/base';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAllTaskQueryHandler implements RequestHandler<GetAllTaskRequest, GetAllTaskResponse[]> {
  repository = inject(TaskReadableRepository);

  public handle(request: GetAllTaskRequest): Observable<GetAllTaskResponse[]> {
    return this.repository.getAll(request);
  }
}
