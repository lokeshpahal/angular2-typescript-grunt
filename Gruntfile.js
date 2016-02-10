var typescriptFiles = ["app/**/*.ts", "!app/typings/**/*.*"];

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-htmljson');
    grunt.loadNpmTasks("grunt-concat-sourcemap");
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-newer');
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        ngtemplates: {
            app: {
                src: 'app/**/**.html',
                dest: 'generated_js/app.templates.js',
                options: {
                    prefix: "' + staticUrl + '",
                    url: function(url) {
                        return url;
                    },
                    bootstrap: function(module, script) {
                        return 'getscrumbanTemplates = function($templateCache, staticUrl){ ' + script + '};';
                    }
                }
            }
        },
        ts: {
            app: {
                src: typescriptFiles,
                dest: 'generated_js/app',
                options: {
                    module: 'system', 
                    moduleResolution: 'node',
                    target: 'es5',
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    noImplicitAny: false
                }
            }
        },
        watch: {
            options: {
                interval: 1000
            },
            templates: {
                files: ["app/**/*.html"],
                tasks: ["ngtemplates:app"]
            },
            ts: {
                files: typescriptFiles,
                tasks: ["newer:ts:app"]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: false, 
                    flatten: true,
                    src: ["node_modules/es6-shim/es6-shim.min.js"],
                    dest: 'generated_js/angular2/', 
                    filter: 'isFile'
                }],
            },
        },
        concat: {
            angular2: {
                options:{
                    sourceMap: false,
                    stripBanners: true
                },
                src: [
                    "node_modules/systemjs/dist/system-polyfills.js",
                    "node_modules/angular2/bundles/angular2-polyfills.min.js",
                    "node_modules/systemjs/dist/system.src.js",
                    "node_modules/rxjs/bundles/Rx.min.js",
                    "node_modules/angular2/bundles/angular2.min.js"
                ],
                dest: "generated_js/angular2/angular2.js"
            }
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: true
            },
            dist: {
                files: {
                    "generated_js/angular2/angular2.min.js": ["generated_js/angular2/angular2.js"],
                    "generated_js/app.templates.min.js": ["generated_js/app.templates.js"]
                }
            }
        }
    });
    return grunt.registerTask("default", ["ts", "ngtemplates", "copy", "htmljson", "concat", "uglify"]);
};