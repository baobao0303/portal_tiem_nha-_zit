import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {
  private readonly translateService = inject(TranslateService);

  transform(value?: Date | string | number | null): string {
    if (!value) return '';

    const now = new Date();
    const date = new Date(value);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const isSameDay = now.toDateString() === date.toDateString();
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString();

    const lang = this.translateService.currentLang || 'en';

    if (diffMin < 1) return this.translateService.instant('time.just_now');

    if (isSameDay) {
      return new Intl.DateTimeFormat(lang, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
    }

    if (isYesterday) {
      const time = new Intl.DateTimeFormat(lang, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(date);
      return `${this.translateService.instant('time.yesterday')}, ${time}`;
    }

    return new Intl.DateTimeFormat(lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }
}
