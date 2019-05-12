import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { BestMealSharedModule } from 'app/shared';
import {
    LogradouroComponent,
    LogradouroDetailComponent,
    LogradouroUpdateComponent,
    LogradouroDeletePopupComponent,
    LogradouroDeleteDialogComponent,
    logradouroRoute,
    logradouroPopupRoute
} from './';

const ENTITY_STATES = [...logradouroRoute, ...logradouroPopupRoute];

@NgModule({
    imports: [BestMealSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LogradouroComponent,
        LogradouroDetailComponent,
        LogradouroUpdateComponent,
        LogradouroDeleteDialogComponent,
        LogradouroDeletePopupComponent
    ],
    entryComponents: [LogradouroComponent, LogradouroUpdateComponent, LogradouroDeleteDialogComponent, LogradouroDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BestMealLogradouroModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
