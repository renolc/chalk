# chalk-blog [![npm version](https://badge.fury.io/js/chalk-blog.svg)](https://badge.fury.io/js/chalk-blog)

A simple CLI to create a statically hostable blog

### Example

- [Live Example](https://renolc.github.io)
- [Source Repo](https://github.com/renolc/renolc.github.io)

### Installation

```bash
npm i chalk-blog -g
```

### Usage

```bash
# chalk init <repoUrl>
#   create a new blog in the current dir
#
# - inits git repo
# - sets up git remote to <repoUrl>
# - copies blog skeleton files
# - does initial commit

chalk init <url>


# chalk new <...name>
#   create a new post
#
# - creates a md file
# - prepopulates <name> as header
# - opens md file in default .md editor

chalk new First Post


# chalk publish
#   publish any local changes
#
# - compiles md files to HTML
# - updates index.html with latest post synopses
# - commits compiled files to git
# - pushes to remote master

chalk publish
```

### HTML templates

After you `chalk init`, you will be provided with a series of template HTML files (located at `/meta/templates/`). You may alter these, along with the `style.css` file, to change the appearance of your blog as you wish.

If you ever desire to change the order of your posts, just adjust the `order.json` file accordingly.