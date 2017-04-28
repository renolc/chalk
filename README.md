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

#### CLI

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
# - prepopulates <name> and current date as headers
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

#### `/meta/templates`

Edit these in order to adjust the layout of your blog. Each template is provided with the following variables which you can embed in your templates via handlebars syntax (`{{varName}}`). If you edit any of your templates, `chalk publish` to update your generated `html` files.

- `index.html` - homepage, lists most recent posts in descending order
  - _items_ - list of the most recent posts - uses `item.html` template
  - _next_ - link to next page (more recent posts) - uses `next.html` template
  - _prev_ - link to previous page (older posts) - uses `prev.html` template

- `item.html` - synopsis block of most recent post, listed on homepage
  - _title_ - contents of the first `h1` in the post (prepopulated with `name` provided during `chalk new`)
  - _date_ - contents of the first `h2` in the post (prepopulated with current date during `chalk new`)
  - _firstP_ - contents of the first `p` in the post
  - _fileName_ - standardized filename so that you can link to the full post

- `next.html` - link to next page/post
  - _url_ - url of next item
  - _text_ - text to display in next link

- `prev.html` - link to prev page/post
  - _url_ - url of prev item
  - _text_ - text to display in prev link

- `post.html` - full blog post content
  - _title_ - contents of the first `h1` in the post (prepopulated with `name` provided during `chalk new`)
  - _body_ - full body contents of the post
  - _next_ - link to next post (more recent) - uses `next.html` template
  - _prev_ - link to prev post (older) - uses `prev.html` template

#### `/style.css`

By default, all template files will use `style.css` for styling. Alter this file to adjust the look and feel of your blog.

#### `/meta/order.json`

`order.json` is an array of post titles. `chalk new` will automatically insert new posts at the end of the array. If you ever desire to alter the order of your posts, simply adjust the ordering in `order.json` and `chalk publish`.

#### `/meta/rss.json`

RSS is automatically generated for you during `chalk publish`. You can edit `rss.json` to provide a title, description, and urls for your feed.

#### `/meta/mds`

This is where your created posts will live in markdown format. If you ever wish to edit a previous posts, alter the `md` file and `chalk publish`. Do not edit the generated `html` file directly, as a `chalk publish` will overwrite any manual changes not present in the markdown or template files.