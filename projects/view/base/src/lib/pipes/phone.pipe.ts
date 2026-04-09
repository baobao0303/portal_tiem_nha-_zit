import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {
  //TODO: Need to update additional cases such as international phone numbers.
  transform(value: string | number): string {
    if (!value) return '';
    let cleaned = value.toString().replace(/\D/g, '');
    if (cleaned.length !== 10) {
      return cleaned;
    }
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }
}
