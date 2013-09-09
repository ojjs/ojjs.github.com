# Server-side with Commandline

OJ has a [commandline tool](http://ojjs.org/docs.html#commandline) that can build OJ server-side. This will get you started:

## Installing Commandline Tool

(1) Install node

(2) Install the `oj` commandline tool with npm:

    npm install -g oj

(3) Install node modules specified in `package.json`:

    npm install

(4) Compile `.oj` (or `.ojc`) files in this directory with:

    oj .

Note: the OJ tool traverses through `require` includes and unifies all files together. It can inculde node modules such as `underscore`, `backbone`, etc, the same way. These will be picked up from your `package.json` file as you would expect. In addition, it can minify with `--minify` or watch with `--watch` options set.

(5) To be fancy compile with minification and watching

    oj . --minify --watch
