import { Pipe, PipeTransform, inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);
  private readonly translateService = inject(TranslateService, { optional: true });

  transform(value: Date | string | number, format: string | Intl.DateTimeFormatOptions = 'long', locale?: string): string | null {
    if (!value) {
      return null;
    }

    const lang = locale || this.translateService?.currentLang || this.locale || 'en';
    const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      console.error('Invalid date value:', value);
      return null;
    }

    // Custom default formats for different locales
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
    const customFormats: Record<string, Intl.DateTimeFormatOptions> = {
      vi: { day: '2-digit', month: '2-digit', year: 'numeric', weekday: 'long' }, // Vietnamese: 01/01/2021, Thứ Sáu
      ja: { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }, // Japanese: 2021/01/01, 金曜日
      en: { month: '2-digit', day: '2-digit', year: 'numeric', weekday: 'long' }, // English: 01/01/2021, Friday
    };

    let options: Intl.DateTimeFormatOptions;

    // If `format` is a string, map it to predefined options
    if (typeof format === 'string') {
      switch (format) {
        case 'short':
          options = { month: '2-digit', day: '2-digit', year: 'numeric' };
          break;
        case 'long':
          options = customFormats[lang];
          break;
        default:
          console.warn(`Unknown format "${format}". Falling back to 'short'.`);
          options = { month: '2-digit', day: '2-digit', year: 'numeric' };
      }
    } else {
      // If `format` is already options, use it directly
      options = format;
    }

    try {
      return new Intl.DateTimeFormat(lang, options).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  }
}
