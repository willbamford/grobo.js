module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['grobo/*.js'],
            options: {
                ignores: ['built/**/*.*', 'tests/lib/**/*.js']
            }
        },
        jasmine: {
            all: {
                options: {
                    specs: 'tests/spec/**/*-spec.js',
                    template: require('grunt-template-jasmine-requirejs')
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '',
                    name: 'main',
                    out: "grobo-min.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', ['jshint', 'jasmine']);
    grunt.registerTask('compile', ['jshint', 'jasmine', 'requirejs']);
};