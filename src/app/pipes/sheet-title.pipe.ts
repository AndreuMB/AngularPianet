import { Pipe, PipeTransform } from '@angular/core';
import { Sheets } from '../interfaces/sheets';

@Pipe({
  name: 'sheetTitle'
})
export class SheetTitlePipe implements PipeTransform {

  transform(sheets: Sheets[], title : string): Sheets[] {
    const filter = title ? title.toLocaleLowerCase() : null;
    
    let sheetsFilter =  filter ? 
    sheets.filter(p => p.title.toLocaleLowerCase().includes(filter))
    : sheets;
    console.log("filter = ", sheetsFilter);
    return sheetsFilter;
  }

}
