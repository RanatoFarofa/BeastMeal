/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CartaoRecompensaComponentsPage, CartaoRecompensaDeleteDialog, CartaoRecompensaUpdatePage } from './cartao-recompensa.page-object';

const expect = chai.expect;

describe('CartaoRecompensa e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cartaoRecompensaUpdatePage: CartaoRecompensaUpdatePage;
    let cartaoRecompensaComponentsPage: CartaoRecompensaComponentsPage;
    let cartaoRecompensaDeleteDialog: CartaoRecompensaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CartaoRecompensas', async () => {
        await navBarPage.goToEntity('cartao-recompensa');
        cartaoRecompensaComponentsPage = new CartaoRecompensaComponentsPage();
        await browser.wait(ec.visibilityOf(cartaoRecompensaComponentsPage.title), 5000);
        expect(await cartaoRecompensaComponentsPage.getTitle()).to.eq('bestMealApp.cartaoRecompensa.home.title');
    });

    it('should load create CartaoRecompensa page', async () => {
        await cartaoRecompensaComponentsPage.clickOnCreateButton();
        cartaoRecompensaUpdatePage = new CartaoRecompensaUpdatePage();
        expect(await cartaoRecompensaUpdatePage.getPageTitle()).to.eq('bestMealApp.cartaoRecompensa.home.createOrEditLabel');
        await cartaoRecompensaUpdatePage.cancel();
    });

    it('should create and save CartaoRecompensas', async () => {
        const nbButtonsBeforeCreate = await cartaoRecompensaComponentsPage.countDeleteButtons();

        await cartaoRecompensaComponentsPage.clickOnCreateButton();
        await promise.all([
            cartaoRecompensaUpdatePage.setNumeroInput('numero'),
            cartaoRecompensaUpdatePage.setValidadeInput('validade'),
            cartaoRecompensaUpdatePage.setPontuacaoInput('5'),
            cartaoRecompensaUpdatePage.situacaoSelectLastOption()
        ]);
        expect(await cartaoRecompensaUpdatePage.getNumeroInput()).to.eq('numero');
        expect(await cartaoRecompensaUpdatePage.getValidadeInput()).to.eq('validade');
        expect(await cartaoRecompensaUpdatePage.getPontuacaoInput()).to.eq('5');
        await cartaoRecompensaUpdatePage.save();
        expect(await cartaoRecompensaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cartaoRecompensaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CartaoRecompensa', async () => {
        const nbButtonsBeforeDelete = await cartaoRecompensaComponentsPage.countDeleteButtons();
        await cartaoRecompensaComponentsPage.clickOnLastDeleteButton();

        cartaoRecompensaDeleteDialog = new CartaoRecompensaDeleteDialog();
        expect(await cartaoRecompensaDeleteDialog.getDialogTitle()).to.eq('bestMealApp.cartaoRecompensa.delete.question');
        await cartaoRecompensaDeleteDialog.clickOnConfirmButton();

        expect(await cartaoRecompensaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
