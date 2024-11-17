
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CardModule,
    CommonModule,
    ReactiveFormsModule,
    MessagesModule,
    //BrowserModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDo App';
}
