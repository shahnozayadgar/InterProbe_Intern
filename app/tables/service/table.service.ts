import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Table, MiniTable } from '../../model/table';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private http: HttpClient) { }

  getTables(): Observable<Table[]>{
    return this.http.get<Table[]>("http://localhost:8080/api/moms/list")
  }

  createTable(name: any): Observable<Table> {
    return this.http.post<Table>("http://localhost:8080/api/moms/save", name);
  }

  deleteTable(tableID: number): Observable<Table> {
    return this.http.delete<Table>(`http://localhost:8080/api/moms/delete?momId=${tableID}`);
  }

  addMiniTableToTable(tableId: Number, baby: MiniTable): Observable<MiniTable> {
    // parent table id is in the baby object
    return this.http.post<MiniTable>(`http://localhost:8080/api/babies/saveWithMomId/${tableId}`, baby);
  }

  updateTable(table: Table): Observable<Table> {
    return this.http.put<Table>(`http://localhost:8080/api/moms/edit`, table);
  }

}
