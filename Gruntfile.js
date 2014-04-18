module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: ['js/**/*.js'],
            options: {
                ignores: ['js/vendor/**/*.js', 'js/tests/lib/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask(
        'default', ['jshint']
    );
};