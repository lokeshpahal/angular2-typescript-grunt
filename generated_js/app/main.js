System.register(['angular2/platform/browser', './game/game.component'], function(exports_1) {
    var browser_1, game_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (game_component_1_1) {
                game_component_1 = game_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(game_component_1.AppComponent);
        }
    }
});
//# sourceMappingURL=main.js.map