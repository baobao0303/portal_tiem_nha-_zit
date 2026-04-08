import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetAllDepartmentRequest, GetAllDepartmentResponse, GetByIdDepartmentRequest, GetByIdDepartmentResponse } from '@application/messages';
import { RequestMapper, ResponseMapper } from '@core/base';
import { IDepartmentReadableRepository } from '@core/domain';
import { filter, map, Observable } from 'rxjs';
import { ReadableRepository } from '../readable.repository';

@Injectable({
  providedIn: 'root',
})
export class DepartmentReadableRepository extends ReadableRepository implements IDepartmentReadableRepository {
  /**
   * Get all departments
   * @param request GetAllDepartmentRequest
   * @returns Observable<GetAllDepartmentResponse[]>
   */
  public getAll(request: GetAllDepartmentRequest): Observable<GetAllDepartmentResponse[]> {
    const endPoint = `${this._context.endPoint}/Department/get-departments`;
    return this.findAll(endPoint).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => data.map((item: any) => new ResponseMapper(GetAllDepartmentResponse).map(item)))
    );
  }

  /**
   * Retrieves a department by its ID.
   *
   * @param {GetByIdDepartmentRequest} request - The request object containing the department ID.
   * @returns {Observable<GetByIdDepartmentResponse>} An observable that emits the department details.
   *
   */
  public getById(request: GetByIdDepartmentRequest): Observable<GetByIdDepartmentResponse> {
    const endPoint = `${this._context.endPoint}/Department/get-department-by-id`;
    const requestMapper = new RequestMapper(GetByIdDepartmentRequest).map(request);
    return this.findAll(endPoint, {
      params: new HttpParams({ fromObject: requestMapper }),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((data: any) => !!data),
      map((data: any) => new ResponseMapper(GetByIdDepartmentResponse).map(data))
    );
  }
}
