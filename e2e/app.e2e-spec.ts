import { UserFrontendPage } from './app.po';

describe('user-frontend App', () => {
  let page: UserFrontendPage;

  beforeEach(() => {
    page = new UserFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
