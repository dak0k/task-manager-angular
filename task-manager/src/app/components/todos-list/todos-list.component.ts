import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITodo } from '../../interfaces/todo.interface';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { LocalStorageService } from '../../services/local-storage.sevice';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    TodoCardComponent,
    NgIf
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent implements OnInit {
  public readonly localStorageService: LocalStorageService = inject(LocalStorageService);
  public readonly dialog = inject(MatDialog);

  public todos$ = new BehaviorSubject<ITodo[]>([]);

  ngOnInit(): void {
    this.loadTodos();
  }

  private loadTodos(): void {
    const todos = this.localStorageService.getObjects<ITodo>('todo');
    console.log('Loaded Todos:', todos);
    this.todos$.next(todos);
  }

  openDialog(todo: ITodo | null = null): void {
    const dialogRef = this.dialog.open(CreateTodoComponent, {
      data: todo ? { todo, isEdit: true } : { isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result.isEdit ? "Todo was edited" : "Todo was created");
        this.loadTodos();
      }
    });
  }
}
