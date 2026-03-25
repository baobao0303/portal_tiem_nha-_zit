import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';

    // Replace new line with <br> tag
    let formattedText = value.replace(/\n/g, '<br>');

    // Replace `*` with `<strong>` tag
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace `https://` with `<a>` tag
    formattedText = formattedText.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    return formattedText;
  }
}
