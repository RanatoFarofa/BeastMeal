import { element, by, ElementFinder } from 'protractor';

export class NomeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-nome div table .btn-danger'));
    title = element.all(by.css('jhi-nome div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class NomeUpdatePage {
    pageTitle = element(by.id('jhi-nome-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    primeiroNomeInput = element(by.id('field_primeiroNome'));
    nomeMeioInput = element(by.id('field_nomeMeio'));
    sobrenomeInput = element(by.id('field_sobrenome'));
    saudacaoInput = element(by.id('field_saudacao'));
    tituloInput = element(by.id('field_titulo'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPrimeiroNomeInput(primeiroNome) {
        await this.primeiroNomeInput.sendKeys(primeiroNome);
    }

    async getPrimeiroNomeInput() {
        return this.primeiroNomeInput.getAttribute('value');
    }

    async setNomeMeioInput(nomeMeio) {
        await this.nomeMeioInput.sendKeys(nomeMeio);
    }

    async getNomeMeioInput() {
        return this.nomeMeioInput.getAttribute('value');
    }

    async setSobrenomeInput(sobrenome) {
        await this.sobrenomeInput.sendKeys(sobrenome);
    }

    async getSobrenomeInput() {
        return this.sobrenomeInput.getAttribute('value');
    }

    async setSaudacaoInput(saudacao) {
        await this.saudacaoInput.sendKeys(saudacao);
    }

    async getSaudacaoInput() {
        return this.saudacaoInput.getAttribute('value');
    }

    async setTituloInput(titulo) {
        await this.tituloInput.sendKeys(titulo);
    }

    async getTituloInput() {
        return this.tituloInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class NomeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-nome-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-nome'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
