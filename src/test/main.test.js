describe('Main', function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<div id="fixture">Michael</div>';

    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  });

  // remove the html fixture from the DOM
  afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
  });
  it('should Michael', function() {
    expect(document.getElementById('fixture').innerHTML).toBe('Michael');
  });
  it('should display all users',function(){
    mainObj.init();
  });

});