import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocalizedFullNameContext } from '../contexts';

@Pipe({
  name: 'localizedFullName',
  standalone: true,
  pure: false,
})
export class LocalizedFullNamePipe implements PipeTransform {
  private readonly localizedFullNameContext = inject(LocalizedFullNameContext);

  transform(lastName?: string, middleName?: string, firstName?: string): string {
    return this.localizedFullNameContext.formatFullName(lastName, middleName, firstName);
  }
}
