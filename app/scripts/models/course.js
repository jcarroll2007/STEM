/*global Stem, Backbone*/

Stem.Models = Stem.Models || {};

(function () {
    'use strict';

    Stem.Models.Course = Backbone.Model.extend({

        sync: function(method, model, options) {
            options.dataType = 'jsonp';
            return Backbone.sync(method, model, options);
        },

        url: function() {
            var d2lUrl = Stem.config.d2l.protocol + '://' + Stem.config.d2l.host + ':' + Stem.config.d2l.port;
            var appContext = new D2L.ApplicationContext(d2lUrl, Stem.config.d2l.appId, Stem.config.d2l.appKey);
            var userContext = appContext.createUserContextWithValues(Stem.config.d2l.host, Stem.config.d2l.port, Stem.config.d2l.user, Stem.config.d2l.user, Stem.config.d2l.password);
            return Stem.config.d2l.protocol + '://' + userContext.createAuthenticatedUrl('/d2l/api/lp/1.4/orgstructure/' + this.id, 'GET');
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
