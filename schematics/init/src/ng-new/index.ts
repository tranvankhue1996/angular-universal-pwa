import {
    Rule, externalSchematic, chain,
    move, apply, url, mergeWith, MergeStrategy
} from '@angular-devkit/schematics';
import {
    createOrOverwriteFile,
    addOrReplaceScriptInPackageJson, addDependencyToPackageJson
} from '../utils/index';
import { getFileContent } from '@schematics/angular/utility/test';
import { Schema } from './schema';
import { newApp } from '../utils/new-app/index';

export default function (options: Schema): Rule {
    if (!options.directory) {
        options.directory = options.name;
    }
    const templateSource = apply(url('./files'), [
        move(options.directory),
    ]);
    let rule: Rule = chain([
        externalSchematic('@schematics/angular', 'ng-new', options),



        adjustCLIConfig(options),
        newApp(options),
        mergeWith(templateSource, MergeStrategy.Overwrite),
        updatePackageJson(options)
    ]);


    return rule;
}

function updatePackageJson(options: any): Rule {
    return chain([


        addDependencyToPackageJson(options, '@angular/service-worker', '^6.0.0-rc.6'),
        addDependencyToPackageJson(options, '@angular/platform-server', '^6.0.0-rc.6'),
        addDependencyToPackageJson(options, '@angular/cdk', '^6.0.0-rc.6'),
        addDependencyToPackageJson(options, '@angular/material', '^6.0.0-rc.6'),
        addDependencyToPackageJson(options, 'webpack-cli', '2.1.2'),
        addDependencyToPackageJson(options, 'ts-loader', '4.2.0', true),
        addDependencyToPackageJson(options, '@ngx-translate/core', '^10.0.1'),
        addDependencyToPackageJson(options, '@ngx-translate/http-loader', '^3.0.1'),
        addOrReplaceScriptInPackageJson(options, 'build:client-and-server-bundles', 'ng build --prod && ng run __projectName__:server'),
        addOrReplaceScriptInPackageJson(options, 'build:prod', 'npm run build:client-and-server-bundles && npm run webpack:server'),
        addOrReplaceScriptInPackageJson(options, 'test', 'ng test --code-coverage'),
        addOrReplaceScriptInPackageJson(options, 'test:watch', 'ng test --watch --code-coverage'),

        tree => {
            let packageJsonContent = getFileContent(tree, `${options.directory}/package.json`);
            packageJsonContent = packageJsonContent.replace('__projectName__', options.name);
            createOrOverwriteFile(tree, `${options.directory}/package.json`, packageJsonContent);
            return tree;
        }
    ]);
}

function adjustCLIConfig(options: any): Rule {
    return tree => {
        const cliConfig = JSON.parse(getFileContent(tree, `${options.directory}/angular.json`));

        // delete cliConfig.projects[options.name].sourceRoot;

        cliConfig.projects[options.name].architect.build.options.outputPath = 'dist/browser';
        cliConfig.projects[options.name].architect.build.options.main = 'src/main.browser.ts';
        cliConfig.projects[options.name].architect.build.options.assets.push({glob: "manifest.json", input: "src", output: "/"});
        cliConfig.projects[options.name].architect.build.options.assets.push({glob: "ngsw-worker.js", input: "src/assets/fakeSW", output: "/"});
        cliConfig.projects[options.name].architect.build.options.styles = [{input: "src/styles/main.scss"}];
        cliConfig.projects[options.name].architect.build.configurations.production.serviceWorker = true;
        delete cliConfig.defaultProject;


        cliConfig.projects[options.name].architect.serve.configurations.dev = {browserTarget: `${options.name}:build:dev`};
        delete cliConfig.projects[options.name].architect.serve.configurations.production;

        cliConfig.projects[options.name].architect.test.options.assets.push({glob: "manifest.json", input: "src", output: "/"});
        cliConfig.projects[options.name].architect.test.options.styles = [{input: "src/styles/main.scss"}];

        cliConfig.projects[options.name].architect.server = {
            builder: '@angular-devkit/build-angular:server',
            options: {
                outputPath: 'dist/server',
                main: 'src/main.server.ts',
                tsConfig: 'src/tsconfig.server.json'
            }
        };

        cliConfig.projects[`${options.name}-e2e`].architect.e2e.options.devServerTarget = `${options.name}:serve`;

        createOrOverwriteFile(tree, `${options.directory}/angular.json`, JSON.stringify(cliConfig, null, "  "));
        return tree;
    }
}