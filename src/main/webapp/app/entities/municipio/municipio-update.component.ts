import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMunicipio } from 'app/shared/model/municipio.model';
import { MunicipioService } from './municipio.service';

@Component({
    selector: 'jhi-municipio-update',
    templateUrl: './municipio-update.component.html'
})
export class MunicipioUpdateComponent implements OnInit {
    municipio: IMunicipio;
    isSaving: boolean;

    constructor(protected municipioService: MunicipioService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ municipio }) => {
            this.municipio = municipio;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.municipio.id !== undefined) {
            this.subscribeToSaveResponse(this.municipioService.update(this.municipio));
        } else {
            this.subscribeToSaveResponse(this.municipioService.create(this.municipio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMunicipio>>) {
        result.subscribe((res: HttpResponse<IMunicipio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
