import * as path from "path";
import * as Generator from "yeoman-generator";

class AppGenerator extends Generator {
  name: string;
  ts: boolean;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.name = opts.name;
  }

  async prompting() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name:",
        default: this.name || path.basename(__dirname)
      },
      {
        type: "confirm",
        name: "ts",
        message: "Use typescript?",
        default: false
      }
    ]);

    this.name = answers.name;
    this.ts = answers.ts;

    this.destinationRoot(path.resolve(this.name));
    process.chdir(this.destinationPath());
  }

  writing() {
    this.sourceRoot(path.join(__dirname, "../../templates/app"));

    this.fs.copyTpl(
      this.templatePath("README.md.ejs"),
      this.destinationPath("README.md"),
      { name: this.name }
    );

    this.fs.copy(
      this.templatePath(`index.${this.ts ? "ts" : "js"}`),
      this.destinationPath(`index.${this.ts ? "ts" : "js"}`)
    );

    if (this.ts) {
      this.fs.copy(
        this.templatePath("tsconfig.json"),
        this.destinationPath("tsconfig.json")
      );
    }
  }
}

export default AppGenerator;
