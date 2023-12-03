import { Pipe, PipeTransform } from '@angular/core';
import { Report } from './Report';
@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(items: Report[], sortBy: keyof Report | null): Report[] {
    if (!items || !sortBy) {
      return items;
    }

    return items.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      // Here you might need different comparison logic based on the data type
      // For simplicity, we're assuming the types are comparable directly
      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
