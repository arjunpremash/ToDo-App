import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ProjectlistComponent } from '../projectlist/projectlist.component';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

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

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit() {
        this.items = [
            {
                label: 'Projects',
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
                items: [
                    { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout(), },
                ]
            }
        ];
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
