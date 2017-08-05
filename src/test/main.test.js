describe('Main', function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<div id="fixture">Michael</div>';
    document.body.insertAdjacentHTML('afterbegin',fixture);
    mainObj.setUsersArray([
      {"id":1,"username":"ccarpenter0","active":true,"password":"8d83c3eb0b9cb5cc4f78fb26c17a993144c5436976538c69457959d649cf768a","first_name":"Catherine","last_name":null,"last_login":"11/5/2016","email":null,"avatar":"https://robohash.org/inquisquamnon.png?size=50x50&set=set1","gender":["Female"],"favorites":{"book-isbn":"379444935-5","color":null,"drugs":["Amitriptyline Hydrochloride","CLINDAMYCIN PALMITATE HYDROCHLORIDE","Mephyton"]},"coordinates":{"lat":"49.68352","lng":"83.01674"}},
      {"id":2,"username":"drodriguez1","active":false,"password":"ce8050196b1b44e24209f87b483c333954c069cab653d93daf636a27cfa84779","first_name":"Deborah","last_name":null,"last_login":"12/10/2015","email":"dhanson1@360.cn","avatar":null,"gender":[],"favorites":{"book-isbn":"340898615-0","color":"#c0b1f5","drugs":[]},"coordinates":{"lat":"15.3","lng":"-90.06667"}},
      {"id":3,"username":"smitchell2","active":true,"password":"95e72c77a2cb8c614b2c279b43f41fabcc98f2675a6e8db3c63119de84f0ccba","first_name":null,"last_name":"Mitchell","last_login":null,"email":"cmitchell2@ning.com","avatar":"https://robohash.org/nequenonexercitationem.png?size=50x50&set=set1","gender":["Male","Female"],"favorites":{"book-isbn":null,"color":"#ffb295","drugs":[]},"coordinates":{"lat":"59.3667","lng":"18.1333"}},
      {"id":4,"username":"holson3","active":false,"password":"895ba9e10b0fcedd6dee16cf9c8184dedd4113458f02fff60dff7d1d98b0ec60","first_name":"Henry","last_name":"Olson","last_login":"5/20/2016","email":"holson3@1und1.de","avatar":null,"gender":["Female","Female"],"favorites":{"book-isbn":"361971506-8","color":"#24d707","drugs":["Prozac","Miracle Ice","Recombinate"]},"coordinates":{"lat":"36.3265","lng":"-115.3398"}},
      {"id":5,"username":"jhall4","active":false,"password":"e16ee5ab53a78587f311baf22c92a4743debbb1e0ab0807105176e1fbaba39c4","first_name":"Joyce","last_name":"Hall","last_login":"1/28/2016","email":"jhall4@tripod.com","avatar":"https://robohash.org/idbeataesoluta.png?size=50x50&set=set1","gender":["Male","Male"],"favorites":{"book-isbn":"352593517-X","color":"#5af4ee","drugs":["YOUTH FULL TINTED MOISTURIZER","CORTISPORIN","Clear Advantage"]},"coordinates":{"lat":"18.24963","lng":"-74.0971"}},
      {"id":6,"username":"cboyd5","active":false,"password":"6a0cf8707e386c00968780389b5fb7dd26f73a596b31d90bfc6314a0429953d8","first_name":"Christina","last_name":"Boyd","last_login":"10/13/2016","email":"cboyd5@weibo.com","avatar":"https://robohash.org/laboreutaliquam.png?size=50x50&set=set1","gender":["Male"],"favorites":{"book-isbn":"121194510-3","color":"#57763f","drugs":["DELFLEX"]},"coordinates":{"lat":"13.81436","lng":"120.20022"}},
      {"id":7,"username":"valexander6","active":true,"password":"3c9d89867696d29948f373e43e23a7fe2a92ff056ebf7a3cc5080e73bdc5b783","first_name":"Victor","last_name":"Alexander","last_login":"10/13/2016","email":"valexander6@mapy.cz","avatar":null,"gender":["Male","Female"],"favorites":{"book-isbn":"673912351-9","color":"#7f299e","drugs":[]},"coordinates":{"lat":"40.47746","lng":"49.94174"}},
      {"id":8,"username":"mrussell7","active":true,"password":"ad4ceac910f18b5c8e5d5bad179f0254edae9c9efcf5231897458e2e84fa8daa","first_name":"Maria","last_name":"Russell","last_login":"2/10/2016","email":null,"avatar":null,"gender":["Male"],"favorites":{"book-isbn":"851462966-2","color":null,"drugs":["Vicks DayQuil","Mucus Releif","FLUMAZENIL"]},"coordinates":{"lat":"31.52315","lng":"93.51613"}},
      {"id":9,"username":"mhill8","active":true,"password":"144d0c05b2638caccb1e8fa2155f04e26307924c1d4c7dabee606bfc38d98aab","first_name":"Mildred","last_name":"Hill","last_login":"9/9/2016","email":"mhill8@creativecommons.org","avatar":"https://robohash.org/autemcumaccusantium.jpg?size=50x50&set=set1","gender":["Female","Male"],"favorites":{"book-isbn":"975535759-9","color":"#dc8f87","drugs":["Cepacol","Retin-A","Stomachin Antacid"]},"coordinates":{"lat":"36.93744","lng":"137.50059"}},
      {"id":10,"username":"jpeterson9","active":true,"password":"c96a7744b039e1dfbb1cec4c2503b5e5b0eb3bd4ed18e413512866dbab246a47","first_name":"Judy","last_name":null,"last_login":"3/26/2016","email":"jross9@mtv.com","avatar":"https://robohash.org/maioresvoluptasquas.jpg?size=50x50&set=set1","gender":["Male","Female"],"favorites":{"book-isbn":"171638267-X","color":"#18f86f","drugs":[]},"coordinates":{"lat":"14.03886","lng":"108.25011"}}]);
    });
  afterEach(function() {
    document.body.removeChild(document.getElementById('fixture'));
  });
  it('should Michael', function() {
    expect(document.getElementById('fixture').innerHTML).toBe('Michael');
  });
  it('should fetch all users',function(){
    expect(mainObj.getUsersArray().length).toEqual(10);
  });
  it('should fetch active users',function(){

  });
  it('should fetch active Men users',function(){

  });
  it('should fetch active Women users',function(){

  });
  it('should fetch Last Login users of the previous year',function(){

  });
});