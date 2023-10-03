import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { finalize } from 'rxjs';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {
  panelOpenState: boolean = false;
  form: FormGroup | any;
  today = new Date;
  //agregar servicio como proveedor
  constructor(
    private service: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadForm();
    this.refreshNotes();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      task: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  pendingTasks: any = [];
  completedTasks: any = [];

  refreshNotes() {
    this.service.getPendingTasks().subscribe((res) => {
      this.pendingTasks = res;
      this.getCompletedTasks();
    });
  }

  getCompletedTasks() {
    this.service.getCompletedTasks().subscribe((res) => {
      this.completedTasks = res;
    });
  }

  addNotes(newNote: string) {
    this.service.addNote(newNote).then((res) => {
      this.refreshNotes();
    });

    this.form.get('task').setValue('');
  }

  completeTask(event: any, id: string) {
    if (event) {
      this.service.completeTask(id).then((res) => {
        this.refreshNotes();
      });
    }
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id).then((res) => {
      console.log(res);
      this.refreshNotes();
    });
  }

  deleteCompletedTasks() {
    this.service.deleteCompletedTasks().then((res) => {
      this.refreshNotes();
    });
  }
}
