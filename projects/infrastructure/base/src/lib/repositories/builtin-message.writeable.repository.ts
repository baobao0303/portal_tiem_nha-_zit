import { Injectable } from '@angular/core';
import { IBuiltinMessageWriteableRepository } from '@core/domain';
import { WriteableRepository } from '../writeable.repository';

@Injectable({ providedIn: 'root' })
export class BuiltinMessageWriteableRepository extends WriteableRepository implements IBuiltinMessageWriteableRepository {}
