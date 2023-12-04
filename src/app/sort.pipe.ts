import { Pipe, PipeTransform } from '@angular/core';
import { Report } from './Report';
@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(items: Report[], sortBy: string | null): Report[] {
    if (!items || !sortBy) {
      return items;
    }

    return items.sort((a, b) => {
      const valueA = this.getNestedValue(a, sortBy);
      const valueB = this.getNestedValue(b, sortBy);

      if (valueA < valueB) {
        return -1;
      } else if (valueA > valueB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  private getNestedValue(obj: any, path: string): any {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
      result = result[key];
    }
    return result;
  }
}
