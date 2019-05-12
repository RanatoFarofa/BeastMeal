/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { NomeComponentsPage, NomeDeleteDialog, NomeUpdatePage } from './nome.page-object';

const expect = chai.expect;

describe('Nome e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let nomeUpdatePage: NomeUpdatePage;
    let nomeComponentsPage: NomeComponentsPage;
    let nomeDeleteDialog: NomeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Nomes', async () => {
        await navBarPage.goToEntity('nome');
        nomeComponentsPage = new NomeComponentsPage();
        await browser.wait(ec.visibilityOf(nomeComponentsPage.title), 5000);
        expect(await nomeComponentsPage.getTitle()).to.eq('bestMealApp.nome.home.title');
    });

    it('should load create Nome page', async () => {
        await nomeComponentsPage.clickOnCreateButton();
        nomeUpdatePage = new NomeUpdatePage();
        expect(await nomeUpdatePage.getPageTitle()).to.eq('bestMealApp.nome.home.createOrEditLabel');
        await nomeUpdatePage.cancel();
    });

    it('should create and save Nomes', async () => {
        const nbButtonsBeforeCreate = await nomeComponentsPage.countDeleteButtons();

        await nomeComponentsPage.clickOnCreateButton();
        await promise.all([
            nomeUpdatePage.setPrimeiroNomeInput('primeiroNome'),
            nomeUpdatePage.setNomeMeioInput('nomeMeio'),
            nomeUpdatePage.setSobrenomeInput('sobrenome'),
            nomeUpdatePage.setSaudacaoInput('saudacao'),
            nomeUpdatePage.setTituloInput('titulo')
        ]);
        expect(await nomeUpdatePage.getPrimeiroNomeInput()).to.eq('primeiroNome');
        expect(await nomeUpdatePage.getNomeMeioInput()).to.eq('nomeMeio');
        expect(await nomeUpdatePage.getSobrenomeInput()).to.eq('sobrenome');
        expect(await nomeUpdatePage.getSaudacaoInput()).to.eq('saudacao');
        expect(await nomeUpdatePage.getTituloInput()).to.eq('titulo');
        await nomeUpdatePage.save();
        expect(await nomeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await nomeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Nome', async () => {
        const nbButtonsBeforeDelete = await nomeComponentsPage.countDeleteButtons();
        await nomeComponentsPage.clickOnLastDeleteButton();

        nomeDeleteDialog = new NomeDeleteDialog();
        expect(await nomeDeleteDialog.getDialogTitle()).to.eq('bestMealApp.nome.delete.question');
        await nomeDeleteDialog.clickOnConfirmButton();

        expect(await nomeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
