module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['js/**/*.js'],
            options: {
                ignores: ['js/vendor/**/*.js', 'js/tests/lib/**/*.js']
            }
        },
        jasmine: {
            all: {
                options: {
                    specs: 'js/tests/spec/**/*-spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'js/'
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask(
        'default', ['jshint', 'jasmine']
    );
};