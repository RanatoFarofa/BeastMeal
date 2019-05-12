import { element, by, ElementFinder } from 'protractor';

export class MunicipioComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-municipio div table .btn-danger'));
    title = element.all(by.css('jhi-municipio div h2#page-heading span')).first();

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

export class MunicipioUpdatePage {
    pageTitle = element(by.id('jhi-municipio-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomeMunicipioInput = element(by.id('field_nomeMunicipio'));
    uFSelect = element(by.id('field_uF'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomeMunicipioInput(nomeMunicipio) {
        await this.nomeMunicipioInput.sendKeys(nomeMunicipio);
    }

    async getNomeMunicipioInput() {
        return this.nomeMunicipioInput.getAttribute('value');
    }

    async setUFSelect(uF) {
        await this.uFSelect.sendKeys(uF);
    }

    async getUFSelect() {
        return this.uFSelect.element(by.css('option:checked')).getText();
    }

    async uFSelectLastOption() {
        await this.uFSelect
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

export class MunicipioDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-municipio-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-municipio'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
