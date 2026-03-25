import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LocalizedFullNameContext {
  private readonly translateService = inject(TranslateService);

  formatFullName(lastName?: string, middleName?: string, firstName?: string): string {
    const locale = this.translateService.currentLang || 'en';

    switch (locale) {
      case 'vi':
        return [lastName, middleName, firstName].filter(Boolean).join(' ');

      case 'en':
      case 'ja':
        return [firstName, middleName, lastName].filter(Boolean).join(' ');

      default:
        return [lastName, firstName, middleName].filter(Boolean).join(' ');
    }
  }
}
