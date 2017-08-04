describe('Main', function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<div id="name">Michael</div>';

    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    document.body.removeChild(document.getElementById('name'));
  });
  it('should Michael', function() {
    expect(document.getElementById('name').innerHTML).toBe('Michael');
  });

});