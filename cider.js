#!/usr/bin/env node

// TODO:
// - config.json (set URL to your instance)
// - proper argument parsing (when there are more commands/options)
// - let user specify path to repo (uses cwd for now)

// dependencies:
var GitRepo = require('git-tools'),
    colors = require('colors'),
    open = require('open');

// setup:
var args = process.argv.slice(2),
    cwd = process.cwd(),
    repo = new GitRepo(cwd),
    config = {
      ciderURL: 'http://ci2.zhdk.ch/cider-ci'
    }

// open: opens the current branch in cider-ci
if (args[0] === 'open') {
  repo.isRepo(function (err, isRepo) {
    // check if we've got a repo
    if (err || !isRepo) {
      return console.log("Error: Run this command inside a git repo!".red);
    }
    // get the current branch
    repo.currentBranch(function (err, branch) {
      if (err || !branch) { return console.error("Error!".red, err); }
      
      // TODO: use tag URL when it is deployed
      console.log(branch);
      
      open(config.ciderURL+'/workspace/executions?utf8=%E2%9C%93&execution[tags]='+branch+'&per_page=50')
      
    })
  })
  
// show help if no or unknown command
} else {
  console.log("Hint: Use the 'open' command.");
}

