define(['views/home', 'views/login', 'views/register', 'views/search', 'views/profile', 'views/map', 'views/menu', 'views/business_type', 'views/message', 'backbone', 'cookie'],
        function(welcomeView, login_page, register_page, search_page, profile_page, map_page, menu_page, business_page, message_page, Backbone, cookie) {

            var Router = Backbone.Router.extend({
                lastView: null,
                routes: {
                    '': 'home',
                    'login': 'login',
                    'register': 'register',
                    'search': 'search',
                    'profile': 'profile',
                    'map': 'map',
                    'menu': 'menu',
                    'business_type': 'business_type',
                    'message': 'message',
                    'contact': 'contact',
                    'logout': 'logout'
                },
                home: function() {
                    this.payBack();
                    this.lastView = new welcomeView();
                    this.lastView.render();
                },
                login: function() {
                    this.payBack();
                    this.lastView = new login_page();
                    this.lastView.render();
                },
                register: function() {
                    this.payBack();
                    this.lastView = new register_page();
                    this.lastView.render();
                },
                search: function() {
                    this.payBack();
                    this.lastView = new search_page();
                    this.lastView.render();
                },
                profile: function() {
                    this.payBack();
                    var access_token = checkCookie();
                    if (access_token) {
                        this.lastView = new profile_page();
                        this.lastView.render();
                    }
                },
                map: function() {
                    this.payBack();
                    var access_token = checkCookie();
                    if (access_token) {
                        this.lastView = new map_page();
                        this.lastView.render();
                    }
                },
                menu: function() {
                    this.payBack();
                    var access_token = checkCookie();
                    if (access_token) {
                        this.lastView = new menu_page();
                        this.lastView.render();
                    }
                },
                business_type: function() {
                    this.payBack();
                    var access_token = checkCookie();
                    if (access_token) {
                        this.lastView = new business_page();
                        this.lastView.render();
                    }
                },
                message: function() {
                    this.payBack();
                    var access_token = checkCookie();
                    if (access_token) {
                        this.lastView = new message_page();
                        this.lastView.render();
                    }
                },        
                logout: function() {
                    logout();
                },
                // Backbone does not undelegate events on its own especially when multiple
                // views loading into the same **el**
                payBack: function() {
                    if (this.lastView !== null) {
                        this.lastView.undelegateEvents();
                    }
                }
            });
            return Router;
        });
function checkCookie()
{
    var loginBasepath = "#login";
    var user_access_token = $.cookie('access_token');
    if (user_access_token == null || user_access_token == "") {
        window.location.href = loginBasepath;
    }
    else {
        return true;
    }
}
function logout()
{
    var loginBasepath = "#login";
    //===Deleting all cookies===//
    console.log(document.cookie);
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    //===Clear all localstorage===//
    localStorage.clear();
    //===Redirect to login page===//
    window.location.href = loginBasepath;
}
