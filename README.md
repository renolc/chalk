# chalk-blog [![npm version](https://badge.fury.io/js/chalk-blog.svg)](https://badge.fury.io/js/chalk-blog)

A simple CLI to create a GitHub Pages hosted blog

### Example

- [Live Example](https://renolc.github.io)
- [Source Repo](https://github.com/renolc/renolc.github.io)

### Installation

```bash
npm i chalk-blog -g
```

### Usage

Prior to using `chalk-blog`, you will need to have created a new GitHub repo.

```bash
# create new dir for blog
mkdir new-blog
cd new-blog

# initialize blog in current dir
chalk init <githubRepo>

# add first post
chalk new

# update github with new post(s)
chalk up
```

After you update GitHub with your first post, you will need to go into the repo settings and set the GitHub Pages source branch to `master`.
