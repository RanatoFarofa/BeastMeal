import { element, by, ElementFinder } from 'protractor';

export class ProdutoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-produto div table .btn-danger'));
    title = element.all(by.css('jhi-produto div h2#page-heading span')).first();

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

export class ProdutoUpdatePage {
    pageTitle = element(by.id('jhi-produto-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    codigoInput = element(by.id('field_codigo'));
    nomeInput = element(by.id('field_nome'));
    unidadeInput = element(by.id('field_unidade'));
    estoqueMinimoInput = element(by.id('field_estoqueMinimo'));
    estoqueAtualInput = element(by.id('field_estoqueAtual'));
    dataUltimaCompraInput = element(by.id('field_dataUltimaCompra'));
    valorUltimaCompraInput = element(by.id('field_valorUltimaCompra'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCodigoInput(codigo) {
        await this.codigoInput.sendKeys(codigo);
    }

    async getCodigoInput() {
        return this.codigoInput.getAttribute('value');
    }

    async setNomeInput(nome) {
        await this.nomeInput.sendKeys(nome);
    }

    async getNomeInput() {
        return this.nomeInput.getAttribute('value');
    }

    async setUnidadeInput(unidade) {
        await this.unidadeInput.sendKeys(unidade);
    }

    async getUnidadeInput() {
        return this.unidadeInput.getAttribute('value');
    }

    async setEstoqueMinimoInput(estoqueMinimo) {
        await this.estoqueMinimoInput.sendKeys(estoqueMinimo);
    }

    async getEstoqueMinimoInput() {
        return this.estoqueMinimoInput.getAttribute('value');
    }

    async setEstoqueAtualInput(estoqueAtual) {
        await this.estoqueAtualInput.sendKeys(estoqueAtual);
    }

    async getEstoqueAtualInput() {
        return this.estoqueAtualInput.getAttribute('value');
    }

    async setDataUltimaCompraInput(dataUltimaCompra) {
        await this.dataUltimaCompraInput.sendKeys(dataUltimaCompra);
    }

    async getDataUltimaCompraInput() {
        return this.dataUltimaCompraInput.getAttribute('value');
    }

    async setValorUltimaCompraInput(valorUltimaCompra) {
        await this.valorUltimaCompraInput.sendKeys(valorUltimaCompra);
    }

    async getValorUltimaCompraInput() {
        return this.valorUltimaCompraInput.getAttribute('value');
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

export class ProdutoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-produto-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-produto'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
