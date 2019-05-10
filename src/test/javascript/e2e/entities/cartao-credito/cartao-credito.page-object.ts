import { element, by, ElementFinder } from 'protractor';

export class CartaoCreditoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cartao-credito div table .btn-danger'));
    title = element.all(by.css('jhi-cartao-credito div h2#page-heading span')).first();

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

export class CartaoCreditoUpdatePage {
    pageTitle = element(by.id('jhi-cartao-credito-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    bandeiraSelect = element(by.id('field_bandeira'));
    numeroInput = element(by.id('field_numero'));
    cvvInput = element(by.id('field_cvv'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setBandeiraSelect(bandeira) {
        await this.bandeiraSelect.sendKeys(bandeira);
    }

    async getBandeiraSelect() {
        return this.bandeiraSelect.element(by.css('option:checked')).getText();
    }

    async bandeiraSelectLastOption() {
        await this.bandeiraSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNumeroInput(numero) {
        await this.numeroInput.sendKeys(numero);
    }

    async getNumeroInput() {
        return this.numeroInput.getAttribute('value');
    }

    async setCvvInput(cvv) {
        await this.cvvInput.sendKeys(cvv);
    }

    async getCvvInput() {
        return this.cvvInput.getAttribute('value');
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

export class CartaoCreditoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cartaoCredito-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cartaoCredito'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
