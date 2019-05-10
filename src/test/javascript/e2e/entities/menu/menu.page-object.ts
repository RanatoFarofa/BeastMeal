import { element, by, ElementFinder } from 'protractor';

export class MenuComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-menu div table .btn-danger'));
    title = element.all(by.css('jhi-menu div h2#page-heading span')).first();

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

export class MenuUpdatePage {
    pageTitle = element(by.id('jhi-menu-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nomeInput = element(by.id('field_nome'));
    grupoSelect = element(by.id('field_grupo'));
    valorNormalInput = element(by.id('field_valorNormal'));
    tempoPreparoInput = element(by.id('field_tempoPreparo'));
    disponivelInput = element(by.id('field_disponivel'));
    valorReduzidoInput = element(by.id('field_valorReduzido'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNomeInput(nome) {
        await this.nomeInput.sendKeys(nome);
    }

    async getNomeInput() {
        return this.nomeInput.getAttribute('value');
    }

    async setGrupoSelect(grupo) {
        await this.grupoSelect.sendKeys(grupo);
    }

    async getGrupoSelect() {
        return this.grupoSelect.element(by.css('option:checked')).getText();
    }

    async grupoSelectLastOption() {
        await this.grupoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setValorNormalInput(valorNormal) {
        await this.valorNormalInput.sendKeys(valorNormal);
    }

    async getValorNormalInput() {
        return this.valorNormalInput.getAttribute('value');
    }

    async setTempoPreparoInput(tempoPreparo) {
        await this.tempoPreparoInput.sendKeys(tempoPreparo);
    }

    async getTempoPreparoInput() {
        return this.tempoPreparoInput.getAttribute('value');
    }

    getDisponivelInput() {
        return this.disponivelInput;
    }
    async setValorReduzidoInput(valorReduzido) {
        await this.valorReduzidoInput.sendKeys(valorReduzido);
    }

    async getValorReduzidoInput() {
        return this.valorReduzidoInput.getAttribute('value');
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

export class MenuDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-menu-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-menu'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
