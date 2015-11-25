module.exports = function (grunt) {
    require('jit-grunt')(grunt);

    var config = {
        modules: {
            js: [
                'src/public/app.js',
                'src/public/modules/**/*.client.module.js',
                'src/public/modules/**/*.js'
            ]
        }
    };

    grunt.initConfig({
        clean: ['dist'],

        copy: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src/public',
                    src: ['**', '!**/stylesheets/**', '!**/app.js'],
                    dest: 'dist/public/'
                }]
            }
        },

        sass: {
            development: {
                options: {
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    cwd: 'src/public/assets/stylesheets',
                    src: ['*.scss'],
                    dest: 'dist/public/assets/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            public: {
                files: ['src/public/**'],
                tasks: ['copy', 'sass:development', 'ngAnnotate']
            }
        },

        nodemon: {
            development: {
                script: 'src/server',
                options: {
                    ignore: ['src/public'],
                    env: {
                        'NODE_ENV': 'development'
                    }
                }
            }
        },

        ngAnnotate: {
            production: {
                files: {
                    'dist/public/application.js': config.modules.js
                }
            }
        },

        concurrent: {
            development: {
                tasks: ['watch:public', 'nodemon:development'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        mochaTest: {
            server: {
                options: {
                    reporter: 'spec',
                    require: './test/helpers/spec-helper.js'
                },
                src: ['test/server/**/*.spec.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('start', ['clean', 'copy', 'sass:development', 'ngAnnotate', 'concurrent:development']);
    grunt.registerTask('build', ['clean', 'copy', 'ngAnnotate', 'sass:development']);
    grunt.registerTask('test', ['mochaTest:server']);
    grunt.registerTask('default', ['clean', 'copy', 'ngAnnotate', 'sass:development']);
};