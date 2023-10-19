import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customOrderBy'
})
export class CustomOrderByPipe implements PipeTransform {
  transform(array: any[], property: string): any[] {
    if (!Array.isArray(array) || !property) {
      return array;
    }

    if (property === 'name') {
        return array.slice().sort((a, b) => {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        });
    } else {
        return array.slice().sort((a, b) => {
            if (a[property] > b[property]) return -1;
            if (a[property] < b[property]) return 1;
            return 0;
        });
    }


    
  }
}
