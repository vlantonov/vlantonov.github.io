# vlantonov.github.io

Source for [vlantonov.github.io](https://vlantonov.github.io) — a developer
portfolio for Vladislav Antonov, built as a static [Jekyll](https://jekyllrb.com/)
site and hosted on GitHub Pages.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Updating the portfolio content

All projects live in one file: [`_data/projects.yml`](_data/projects.yml),
grouped into modules (skill areas). `index.html` renders them automatically —
adding a project is a data edit, not a template edit.

If you're using an AI coding assistant to help maintain this repo, see
[`AGENTS.md`](AGENTS.md) for the conventions it should follow.

## Structure

| Path | Purpose |
|---|---|
| `_config.yml` | site metadata, cross-account links |
| `_data/projects.yml` | all project content |
| `_layouts/`, `_includes/` | page shell |
| `index.html` | the page itself |
| `assets/css/style.css` | styling |
| `assets/js/main.js` | tag filter + ticker behaviour |

## License

Content © Vladislav Antonov. Feel free to fork the site structure itself.
