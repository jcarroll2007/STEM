/*global Stem, $*/

// Main JavaScript file for STEM Incubator site. Code in
// this file mostly just sets things up for the app and
// then launches it. This file also includes configuration
// information.

// Everything in the application is namespaced under the
// global variable `Stem`. Invidual components (e.g. models,
// views, collections, etc.) add themselves to this
// namespace as part of their definition.

window.Stem = {
    Collections: {},
    Models: {},
    Routers: {},
    Views: {},

    // Global configuration items (e.g. API keys) are
    // defined in the `config` property.

    config: {
        donorsChooseApiKey: 'DONORSCHOOSE',
        oae: {
            host: 'stemincubator.oae-qa1.oaeproject.org',
            protocol: 'http:'
        },
        d2l: {
            appId: '_Xcx8T4j-UpDCIvl6S73-A',
            host: 'gatech.brightspace.com',
            protocol: 'https',
            port: '443',
            orgId: '6614',
            user: 'stemincubator'
        }
    },

    // The `init()` function is called when it's time
    // to start the application.

    init: function () {
        'use strict';
        new Stem.Routers.App();
    }
};

// Wait for jQuery's `ready` event to start the application.

$(document).ready(function () {
    'use strict';
    Stem.init();
});

