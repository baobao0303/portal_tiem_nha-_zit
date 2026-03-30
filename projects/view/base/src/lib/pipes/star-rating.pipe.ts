import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: true,
})
export class StarRatingPipe implements PipeTransform {
  transform(rating: number): string {
    if (rating < 0 || rating > 5) {
      return '';
    }

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="mdi mdi-star gold"></i> ';
    }

    if (halfStar) {
      stars += '<i class="mdi mdi-star-half-full gold"></i> ';
    }

    for (let i = fullStars + (halfStar ? 1 : 0); i < 5; i++) {
      stars += '<i class="mdi mdi-star-outline gold"></i> ';
    }

    return stars;
  }
}
