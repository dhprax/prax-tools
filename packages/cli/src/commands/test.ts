/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

// Be careful with these imports. As many as possible should be dynamic imports
// in the run method in order to minimize startup time from loading unused code.

import {ProjectConfig} from 'prax-project-config';

import {Command, CommandOptions} from './command';

export class TestCommand implements Command {
  name = 'test';
  aliases = [];

  description = 'Runs web-component-tester';

  args = [
    {
      name: 'persistent',
      alias: 'p',
      description: 'Keep browsers active (refresh to rerun tests)',
      type: Boolean,
    },
    {
      name: 'plugin',
      description: 'Plugins that should be loaded',
      type: String,
    },
    {
      name: 'skip-plugin',
      description: 'Configured plugins that should _not_ be loaded',
      type: String,
    },
    {
      name: 'expanded',
      description: 'Log a status line for each test run',
      type: String,
    },
    {
      name: 'simpleOutput',
      description: 'Avoid fancy terminal output',
      type: String,
    },
    {
      name: 'skip-update-check',
      description: 'Don\'t check for updates',
      type: String,
    },
    {
      name: 'webserver-port',
      description: 'A port to use for the test webserver',
      type: String,
    },
    {
      name: 'color',
      description: '',
      type: String,
    },
    {
      name: 'local',
      alias: 'l',
      description: 'Local browsers to run tests on, or \'all\'',
      type: String,
    },
    {
      name: 'selenium-arg',
      description:
          'Additional selenium server arguments. Port is auto-selected.',
      type: String,
    },
    {
      name: 'skip-selenium-install',
      description: 'Skip trying to install selenium',
      type: String,
    },
    {
      name: 'sauce-access-key',
      description: 'Sauce Labs access key',
      type: String,
    },
    {
      name: 'sauce',
      alias: 's',
      description: 'Remote Sauce Labs browsers to run tests on, or \'default\'',
      multiple: true,
      type: String,
    },
    {
      name: 'build-number',
      description:
          'The build number tested by this test for the sauce labs REST API',
      type: String,
    },
    {
      name: 'job-name',
      description: 'Job name for the sauce labs REST API',
      type: String,
    },
    {
      name: 'port',
      description:
          'Select an alternative port for Sauce Connect (default is 4445)',
      type: String,
    },
    {
      name: 'sauce-tunnel-id',
      description: 'Sauce Connect tunnel identifier',
      type: String,
    },
    {
      name: 'sauce-username',
      description: 'Sauce Labs username',
      type: String,
    },
    {
      name: 'visibility',
      description:
          'Set job visibility to \'public\', \'public restricted\', \'share\', \'team\' or \'private\'',
      type: String,
    },
    {
      name: 'config-file',
      description:
          'Config file that needs to be used by wct. ie: wct.config-sauce.js',
      type: String,
    },
  ];

  async run(_options: CommandOptions, config: ProjectConfig): Promise<void> {
    const wct = await import('web-component-tester');

    const wctArgs = process.argv.slice(3);

    if (config.npm) {
      wctArgs.push('--npm');
    }

    if (config.moduleResolution) {
      wctArgs.push(`--module-resolution=${config.moduleResolution}`);
    }

    if (config.componentDir) {
      wctArgs.push(`--component-dir='${config.componentDir}'`);
    }

    return wct.cli.run(process.env, wctArgs, process.stdout);
  }
}
