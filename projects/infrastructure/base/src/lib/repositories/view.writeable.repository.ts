import { Injectable } from '@angular/core';
import { IViewWriteableRepository } from '@core/domain';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class ViewWriteableRepository extends WriteableRepository implements IViewWriteableRepository {}
