import { Component, OnInit } from '@angular/core';
import { AdminUserTableItem } from '../../models/AdminUserTableItem';
import { ClientUserTableItem } from '../../models/ClientUserTableItem';

@Component({
  selector: 'qr-admin-panel-page',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class QrAdminPanelPageComponent implements OnInit {
  selectedTable: string;
  tableRecordCount: number;
  adminUsers: AdminUserTableItem[];
  clientUsers: ClientUserTableItem[];

  constructor() {}

  ngOnInit() {
    this.tableRecordCount = 0;
  }

  onTableSelected(selectedTable) {
    this.selectedTable = selectedTable;
  }
}
