import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatting',
})
export class NumberFormattingPipe implements PipeTransform {
  transform(value: any): any {
    if (value.toString().includes('.')) {
      return parseFloat(value).toFixed(2);
    }
    return value;
  }
}
