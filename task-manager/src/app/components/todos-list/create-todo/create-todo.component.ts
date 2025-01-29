import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {ITodo} from '../../../interfaces/todo.interface';
import {LocalStorageService} from '../../../services/local-storage.sevice';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-create-todo',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
    MatLabel,
    MatError,
    NgIf,
    MatCheckbox
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTodoComponent {
  createEditForm: FormGroup;
  public readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  public data: { todo: ITodo, isEdit: boolean } = inject(MAT_DIALOG_DATA)

  constructor(private fb: FormBuilder,  private dialogRef: MatDialogRef<CreateTodoComponent>) {
    this.createEditForm = this.fb.group({
      title: [this.data?.todo?.title || '', Validators.required],
      description: [this.data?.todo?.description || ''],
      done: [this.data?.todo?.done || '']
    });
  }

  submitForm(): void {
    if (this.createEditForm.valid) {
      const todo = this.createEditForm.value;

      if (this.data.isEdit && this.data.todo.id) {
        todo.id = this.data.todo.id;
        this.localStorageService.updateObject<ITodo>('todo', todo.id)
      } else {
        todo.id = uuidv4();
        todo.done = this.createEditForm.value.done ?? false;
        this.localStorageService.saveObject('todo', todo)
      }

      this.dialogRef.close({ todo, isEdit: this.data.isEdit });
    }
  }
}
