import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //agregar servicio como proveedor
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshNotes();
  }

  notes: any = [];

  refreshNotes() {
    this.service.getNotes().subscribe((res) => {
      this.notes = res;
    });
  }

  addNotes(newNote: string) {
    this.service.addNote(newNote).then((res) => {
      console.log(res);
      this.refreshNotes();
    });
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id).then((res) => {
      console.log(res);
      this.refreshNotes();
    });
  }
}
