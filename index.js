const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      // TODO: Pull a random quote from the quotes.txt file
      const data = await fs.readFile(QUOTE_FILE, "utf8");
      const lines = data.split("\n").filter(line => line.trim() !=="");
      const randomLine = lines [Math.floor(Math.random() * lines.length)];
      const [quote, author] = randomLine.split("|");
      // console log the quote and author
      // You may style the text with chalk as you wish
      console.log(chalk.whiteBright(`"${quote}"`));
      console.log(chalk.gray(`- ${author || "Anonymous"}`));
      } catch (err) {
        console.error(chalk.red("Error"), err);
      }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    // TODO: Add the quote and author to the quotes.txt file
    try {
      // save the author as "Anonymous".
      // After the quote/author is saved,
      const newQuote = `${quote}|${author || "Anonymous"}\n`;
      await fs.appendFile(QUOTE_FILE, newQuote, "utf8");
      // alert the user that the quote was added.
      // You may style the text with chalk as you wish      
      // // HINT: You can store both author and quote on the same line using
      // a separator like pipe | and then using .split() when retrieving
      console.log(chalk.green("Quote added!"));
      console.log(chalk.whiteBright(`"${quote}`));
      console.log(chalk.gray(`- ${author || "Anonymous"}`));
    } catch (err) {
      console.log(chalk.red("Error"), err);
    }
  });

program.parse();
