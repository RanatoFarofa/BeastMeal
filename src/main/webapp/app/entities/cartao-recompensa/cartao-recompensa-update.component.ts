import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICartaoRecompensa } from 'app/shared/model/cartao-recompensa.model';
import { CartaoRecompensaService } from './cartao-recompensa.service';

@Component({
    selector: 'jhi-cartao-recompensa-update',
    templateUrl: './cartao-recompensa-update.component.html'
})
export class CartaoRecompensaUpdateComponent implements OnInit {
    cartaoRecompensa: ICartaoRecompensa;
    isSaving: boolean;

    constructor(protected cartaoRecompensaService: CartaoRecompensaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cartaoRecompensa }) => {
            this.cartaoRecompensa = cartaoRecompensa;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cartaoRecompensa.id !== undefined) {
            this.subscribeToSaveResponse(this.cartaoRecompensaService.update(this.cartaoRecompensa));
        } else {
            this.subscribeToSaveResponse(this.cartaoRecompensaService.create(this.cartaoRecompensa));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartaoRecompensa>>) {
        result.subscribe((res: HttpResponse<ICartaoRecompensa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
