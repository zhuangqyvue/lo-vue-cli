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
      },
      {
        type: "input",
        name: "npmtopic",
        message: "是否安装自定义饿了么主题?(y/n)",
        default: "y"
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
    // This._writingTest();
    // this._writingTheme();
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

  // _writingTest() {
  //   this.fs.copyTpl(this.templatePath("test/**"), this.destinationPath("test"));
  // }

  // _writingTheme() {
  //   let istopic = this.props.npmtopic;
  //   if (istopic === "y") {
  //     this.fs.copyTpl(
  //       this.templatePath("theme/**"),
  //       this.destinationPath("theme")
  //     );
  //   }
  // }

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
    // This.fs.copyTpl(
    //   this.templatePath("static/**"),
    //   this.destinationPath("static")
    // );
    // Let istopic = this.props.npmtopic;
    // if (istopic === "y") {
    //   this.fs.copyTpl(
    //     this.templatePath("element-variables.scss"),
    //     this.destinationPath("element-variables.scss")
    //   );
    // }
  }

  _writingPkgJosn() {
    // Let istopic = this.props.npmtopic;
    // if (istopic === "y") {
    //   const pkg = this.fs.readJSON(this.templatePath("package.json"), {});
    //   extend(pkg, {
    //     dependencies: {
    //       "element-theme-chalk":
    //         "git+http://geek.glodon.com/scm/glk/gtptheme.git"
    //     },
    //     jest: {
    //       testPathIgnorePatterns: ["templates"]
    //     }
    //   });
    //   this.fs.writeJSON(this.templatePath("package.json"), pkg);
    // }

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
  // Install() {
  //   this.installDependencies({ bower: false });
  // }
};
