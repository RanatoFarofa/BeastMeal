import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ICartaoCredito } from 'app/shared/model/cartao-credito.model';
import { CartaoCreditoService } from './cartao-credito.service';

@Component({
    selector: 'jhi-cartao-credito-update',
    templateUrl: './cartao-credito-update.component.html'
})
export class CartaoCreditoUpdateComponent implements OnInit {
    cartaoCredito: ICartaoCredito;
    isSaving: boolean;

    constructor(protected cartaoCreditoService: CartaoCreditoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cartaoCredito }) => {
            this.cartaoCredito = cartaoCredito;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cartaoCredito.id !== undefined) {
            this.subscribeToSaveResponse(this.cartaoCreditoService.update(this.cartaoCredito));
        } else {
            this.subscribeToSaveResponse(this.cartaoCreditoService.create(this.cartaoCredito));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICartaoCredito>>) {
        result.subscribe((res: HttpResponse<ICartaoCredito>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
