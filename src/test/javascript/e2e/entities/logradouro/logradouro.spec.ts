/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { LogradouroComponentsPage, LogradouroDeleteDialog, LogradouroUpdatePage } from './logradouro.page-object';

const expect = chai.expect;

describe('Logradouro e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let logradouroUpdatePage: LogradouroUpdatePage;
    let logradouroComponentsPage: LogradouroComponentsPage;
    let logradouroDeleteDialog: LogradouroDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Logradouros', async () => {
        await navBarPage.goToEntity('logradouro');
        logradouroComponentsPage = new LogradouroComponentsPage();
        await browser.wait(ec.visibilityOf(logradouroComponentsPage.title), 5000);
        expect(await logradouroComponentsPage.getTitle()).to.eq('bestMealApp.logradouro.home.title');
    });

    it('should load create Logradouro page', async () => {
        await logradouroComponentsPage.clickOnCreateButton();
        logradouroUpdatePage = new LogradouroUpdatePage();
        expect(await logradouroUpdatePage.getPageTitle()).to.eq('bestMealApp.logradouro.home.createOrEditLabel');
        await logradouroUpdatePage.cancel();
    });

    it('should create and save Logradouros', async () => {
        const nbButtonsBeforeCreate = await logradouroComponentsPage.countDeleteButtons();

        await logradouroComponentsPage.clickOnCreateButton();
        await promise.all([logradouroUpdatePage.tipoSelectLastOption(), logradouroUpdatePage.setNomeInput('nome')]);
        expect(await logradouroUpdatePage.getNomeInput()).to.eq('nome');
        await logradouroUpdatePage.save();
        expect(await logradouroUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await logradouroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Logradouro', async () => {
        const nbButtonsBeforeDelete = await logradouroComponentsPage.countDeleteButtons();
        await logradouroComponentsPage.clickOnLastDeleteButton();

        logradouroDeleteDialog = new LogradouroDeleteDialog();
        expect(await logradouroDeleteDialog.getDialogTitle()).to.eq('bestMealApp.logradouro.delete.question');
        await logradouroDeleteDialog.clickOnConfirmButton();

        expect(await logradouroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
