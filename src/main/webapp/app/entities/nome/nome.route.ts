import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Nome } from 'app/shared/model/nome.model';
import { NomeService } from './nome.service';
import { NomeComponent } from './nome.component';
import { NomeDetailComponent } from './nome-detail.component';
import { NomeUpdateComponent } from './nome-update.component';
import { NomeDeletePopupComponent } from './nome-delete-dialog.component';
import { INome } from 'app/shared/model/nome.model';

@Injectable({ providedIn: 'root' })
export class NomeResolve implements Resolve<INome> {
    constructor(private service: NomeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INome> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Nome>) => response.ok),
                map((nome: HttpResponse<Nome>) => nome.body)
            );
        }
        return of(new Nome());
    }
}

export const nomeRoute: Routes = [
    {
        path: '',
        component: NomeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'bestMealApp.nome.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: NomeDetailComponent,
        resolve: {
            nome: NomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bestMealApp.nome.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: NomeUpdateComponent,
        resolve: {
            nome: NomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bestMealApp.nome.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: NomeUpdateComponent,
        resolve: {
            nome: NomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bestMealApp.nome.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const nomePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: NomeDeletePopupComponent,
        resolve: {
            nome: NomeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'bestMealApp.nome.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
