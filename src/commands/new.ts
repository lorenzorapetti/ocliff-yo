import Command from "@oclif/command";
import * as yeoman from "yeoman-environment";

class NewCommand extends Command {
  static args = [{ name: "name" }];

  async run() {
    const { args } = this.parse(NewCommand);
    const env = yeoman.createEnv();

    env.register(require.resolve("../generators/app"), "generate:app");

    env.run("generate:app", args, (err: Error | null) => {
      if (err) this.error(err);
      this.log("App created!");
    });
  }
}

export default NewCommand;
