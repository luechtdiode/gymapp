import { GymappBootstrapPage } from './app.po';

describe('gymapp-bootstrap App', function() {
  let page: GymappBootstrapPage;

  beforeEach(() => {
    page = new GymappBootstrapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
