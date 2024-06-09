import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../shared.module';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ], imports: [CommonModule,
        MatToolbarModule,
        MatListModule,
        SharedModule,
        MatMenuModule,
        MatIconModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class HeaderModule { }
