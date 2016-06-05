Example Projects for OJ
===============================================================================

The easiest way to create OJ projects is through the Yeoman tool (yo):

Install the tool:

    npm install -g oj yo generator-oj

Run the tool:

    yo oj

This tool will ask you if you want an Express Server or a Static Server (using the OJ CLI tool).

Also, feel free to look through these example projects for inspiration:

* The html folders demonstrate how to use OJ with `<script>` includes

* The bower folders demonstrates how to use `<script>` includes that are automatically downloaded with bower package management

* The requirejs folders demonstrates how OJ plugins are compatable with requirejs / amd modules. This also uses bower package management to download files.

* The static server folders show how to use the OJ CLI tool (same code as generated with `oj yo:static`)

* The Express server folders show how to use OJ with Express (same code as generated with `oj yo:express`)
