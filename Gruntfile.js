var typescriptFiles = ["app/**/*.ts", "!app/typings/**/*.*"];

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-concat-sourcemap");
    grunt.loadNpmTasks('grunt-newer');
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
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
                    dest: 'generated_js/angular2/es6-shim.min.js', 
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
                    "node_modules/angular2/bundles/angular2.min.js",
                    "js/http.min.js"
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
                    "generated_js/angular2/angular2.min.js": ["generated_js/angular2/angular2.js"]
                }
            }
        }
    });
    return grunt.registerTask("default", ["ts", "copy", "concat", "uglify"]);
};