import { element, by, ElementFinder } from 'protractor';

export class CartaoRecompensaComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cartao-recompensa div table .btn-danger'));
    title = element.all(by.css('jhi-cartao-recompensa div h2#page-heading span')).first();

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

export class CartaoRecompensaUpdatePage {
    pageTitle = element(by.id('jhi-cartao-recompensa-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numeroInput = element(by.id('field_numero'));
    validadeInput = element(by.id('field_validade'));
    pontuacaoInput = element(by.id('field_pontuacao'));
    situacaoSelect = element(by.id('field_situacao'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumeroInput(numero) {
        await this.numeroInput.sendKeys(numero);
    }

    async getNumeroInput() {
        return this.numeroInput.getAttribute('value');
    }

    async setValidadeInput(validade) {
        await this.validadeInput.sendKeys(validade);
    }

    async getValidadeInput() {
        return this.validadeInput.getAttribute('value');
    }

    async setPontuacaoInput(pontuacao) {
        await this.pontuacaoInput.sendKeys(pontuacao);
    }

    async getPontuacaoInput() {
        return this.pontuacaoInput.getAttribute('value');
    }

    async setSituacaoSelect(situacao) {
        await this.situacaoSelect.sendKeys(situacao);
    }

    async getSituacaoSelect() {
        return this.situacaoSelect.element(by.css('option:checked')).getText();
    }

    async situacaoSelectLastOption() {
        await this.situacaoSelect
            .all(by.tagName('option'))
            .last()
            .click();
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

export class CartaoRecompensaDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cartaoRecompensa-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cartaoRecompensa'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
