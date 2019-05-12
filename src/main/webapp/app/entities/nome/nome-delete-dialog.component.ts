import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INome } from 'app/shared/model/nome.model';
import { NomeService } from './nome.service';

@Component({
    selector: 'jhi-nome-delete-dialog',
    templateUrl: './nome-delete-dialog.component.html'
})
export class NomeDeleteDialogComponent {
    nome: INome;

    constructor(protected nomeService: NomeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nomeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'nomeListModification',
                content: 'Deleted an nome'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nome-delete-popup',
    template: ''
})
export class NomeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ nome }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(NomeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.nome = nome;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/nome', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/nome', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
