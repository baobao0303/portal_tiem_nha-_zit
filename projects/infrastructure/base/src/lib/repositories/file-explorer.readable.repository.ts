import { IFileExplorerReadableRepository, IFileExplorerWriteableRepository } from '@core/domain';
import { ReadableRepository } from '../readable.repository';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileExplorerReadableRepository extends ReadableRepository implements IFileExplorerReadableRepository {}
