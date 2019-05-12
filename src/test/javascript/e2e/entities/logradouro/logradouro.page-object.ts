import { element, by, ElementFinder } from 'protractor';

export class LogradouroComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-logradouro div table .btn-danger'));
    title = element.all(by.css('jhi-logradouro div h2#page-heading span')).first();

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

export class LogradouroUpdatePage {
    pageTitle = element(by.id('jhi-logradouro-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    tipoSelect = element(by.id('field_tipo'));
    nomeInput = element(by.id('field_nome'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTipoSelect(tipo) {
        await this.tipoSelect.sendKeys(tipo);
    }

    async getTipoSelect() {
        return this.tipoSelect.element(by.css('option:checked')).getText();
    }

    async tipoSelectLastOption() {
        await this.tipoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setNomeInput(nome) {
        await this.nomeInput.sendKeys(nome);
    }

    async getNomeInput() {
        return this.nomeInput.getAttribute('value');
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

export class LogradouroDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-logradouro-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-logradouro'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
