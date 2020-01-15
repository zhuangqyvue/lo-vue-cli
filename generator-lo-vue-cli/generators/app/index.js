"use strict";
const path = require("path");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
// Const extend = require("deep-extend");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`欢迎使用${chalk.red("lo-vue-cli")}!`));
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "项目名称",
        default: "demo"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log("Writing...\n");
    this._writingBuild();
    this._writingConfig();
    this._writingSrc();
    this._writingOther();
    this._writingPkgJosn();
  }

  _writingBuild() {
    this.fs.copyTpl(
      this.templatePath("build/**"),
      this.destinationPath("build")
    );
  }

  _writingConfig() {
    this.fs.copyTpl(
      this.templatePath("config/**"),
      this.destinationPath("config")
    );
  }

  _writingSrc() {
    this.fs.copy(this.templatePath("src/**"), this.destinationPath("src"));
  }

  _writingOther() {
    this.fs.copyTpl(
      this.templatePath("_babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("_editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("_eslintignore"),
      this.destinationPath(".eslintignore")
    );
    this.fs.copyTpl(
      this.templatePath("_eslintrc"),
      this.destinationPath(".eslintrc.js")
    );
    this.fs.copyTpl(
      this.templatePath("_gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("_postcssrc"),
      this.destinationPath(".postcssrc.js")
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("index.html")
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md")
    );
    this.fs.copyTpl(
      this.templatePath("static/.gitkeep"),
      this.destinationPath("static/.gitkeep")
    );
  }

  _writingPkgJosn() {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json")
    );
  }

  default() {
    if (path.basename(this.destinationPath()) !== __dirname) {
      this.log("\n将自动创建" + this.props.name + "文件夹\n");
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  Install() {
    this.installDependencies({ bower: false });
  }
};
