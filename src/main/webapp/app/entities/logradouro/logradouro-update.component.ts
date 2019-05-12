import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ILogradouro } from 'app/shared/model/logradouro.model';
import { LogradouroService } from './logradouro.service';

@Component({
    selector: 'jhi-logradouro-update',
    templateUrl: './logradouro-update.component.html'
})
export class LogradouroUpdateComponent implements OnInit {
    logradouro: ILogradouro;
    isSaving: boolean;

    constructor(protected logradouroService: LogradouroService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ logradouro }) => {
            this.logradouro = logradouro;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.logradouro.id !== undefined) {
            this.subscribeToSaveResponse(this.logradouroService.update(this.logradouro));
        } else {
            this.subscribeToSaveResponse(this.logradouroService.create(this.logradouro));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILogradouro>>) {
        result.subscribe((res: HttpResponse<ILogradouro>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
