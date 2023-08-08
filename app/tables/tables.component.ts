import { Component, OnInit } from '@angular/core';
import { TableService } from './service/table.service';
import { HttpClient } from '@angular/common/http';
import { Table, MiniTable } from '../model/table';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  tables: Table[];
  newTableName: string = '';
  showForm: boolean = false;
  newMiniTableName: string = ''; 
  newMiniTableTag: string = ''; 
  newMiniTableType: string = '';
  selectedTableForAddingMiniTable: Table = {
    id: 0,
    name: '',
    babies: []
  };


  constructor(
    
    private tableService: TableService,

    ) {
    this.tables = [];

  }

  ngOnInit(): void {
    this.fetchTables();
  }

  createTable(): void {
    if (!this.newTableName) return;

    this.tableService.createTable({ name: this.newTableName }).subscribe(
      (newTable) => {
        this.tables.push(newTable);
        this.newTableName = '';
      },
      (error) => {
        console.error('Error creating table', error);
      }
    );
  }

  private fetchTables(): void {
    this.tableService.getTables().subscribe(
      (tables) => {
        this.tables = tables;
      },
      (error) => {
        console.error('Error fetching tables:', error);
      }
    );
  }

  deleteTable(table: Table): void {
    if (!table.id) {
      console.error('Table ID is missing.');
      return;
    }
    this.tableService.deleteTable(table.id).subscribe(
      () => {
        this.tables = this.tables.filter((t) => t !== table);
      },
      (error) => {
        console.error('Error deleting table:', error);
      }
    );
  }

  addMiniTable(table: Table): void {
    if (!this.newMiniTableName || !this.newMiniTableTag || !this.newMiniTableType) {
      console.error('Please fill in all fields for the MiniTable.');
      return;
    }

    const newMiniTable: MiniTable = {
      name: this.newMiniTableName,
      tag: this.newMiniTableTag,
      type: this.newMiniTableType
    };

    this.newMiniTableName = '';
    this.newMiniTableTag = '';
    this.newMiniTableType = '';
    this.tableService.addMiniTableToTable(Number(table.id), newMiniTable).subscribe(
      (response: MiniTable) => {
        table.babies.push(response)
      },
      (error) => {
        console.error('Error updating table:', error);
      }
    );
  }  
}
