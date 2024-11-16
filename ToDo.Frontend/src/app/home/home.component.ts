import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ProjectlistComponent } from '../projectlist/projectlist.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [MenubarModule,
        ProjectlistComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})

export class HomeComponent {
    items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                label: 'Projects',
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                items: [
                    { label: 'Logout', icon: 'pi pi-power-off' },
                ]
            }
        ];
    }
}
