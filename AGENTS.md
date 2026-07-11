# AGENTS.md

## Project overview
This repo builds `vlantonov.github.io`: a single-page developer portfolio for
Vladislav Antonov (senior C++ developer / software architect), published via
GitHub Pages. It's a static Jekyll site — no client framework, no build tool
beyond Jekyll/Sass, no backend. The audience is other software developers and
hiring managers, so precision and working links matter more than decoration.

The whole content model is one file: **`_data/projects.yml`**. `index.html`
just loops over it with Liquid. Almost every routine update (adding a
project, re-tagging a stack, adding a module) is a `_data/projects.yml` edit
and nothing else.

## Setup commands
```bash
bundle install                 # installs the github-pages gem bundle
bundle exec jekyll serve        # local preview at http://localhost:4000, live reload
bundle exec jekyll build        # static output to ./_site, matches GitHub's own build
```
There is no `npm install` step — the only JS is the dependency-free
`assets/js/main.js`, loaded as a plain `<script>`.

## Repository layout
```
_config.yml           site metadata, cross-account links, manifest numbers
_data/projects.yml     ALL project content — the single source of truth
_layouts/default.html  page shell (head/header/main/footer)
_includes/             head.html, header.html, footer.html, ticker.html
index.html             the entire page: hero, filter bar, module/card grid
assets/css/style.css    design tokens + all styling (plain CSS, no preprocessor deps)
assets/js/main.js       tag filter + ticker sizing, vanilla JS, no dependencies
```

## Adding or updating a project
Edit `_data/projects.yml` only. Each project is:
```yaml
- name: ProjectName          # must match the actual GitHub repo name exactly
  owner: vlantonov            # vlantonov (this account) or vladiant (exploration account)
  desc: One sentence, present tense, what it demonstrates — not a changelog.
  stack:
    - Tag1
    - Tag2
  highlight: true             # optional; adds it to the hero ticker + amber border. Use sparingly (currently 7 total) — this is a spotlight, not a default.
```
Rules:
- `owner` must be a real GitHub account (`vlantonov` or `vladiant`); the card
  links to `https://github.com/{owner}/{name}` with no other validation, so a
  typo here is a dead link on the live site.
- Keep `desc` to one sentence. If you need two, the project probably needs
  its own repo README linked instead, not more hero copy.
- Add new `stack` tags freely — the filter bar is generated from whatever
  tags exist in the data file (`sort | uniq` in `index.html`), so there is
  nothing else to register.
- Do not add pure, unmodified forks as projects. If a fork has meaningful
  original work on top (a template you built out, not just a clone), it's
  fine to include.
- When adding a project, prefer adding it to the most specific existing
  module. Only create a new module (new `id`/`number` block) for a genuinely
  new skill area, and renumber `number` sequentially if you insert one in the
  middle — the numbers are read as an ordered manifest, not badges.

## Design system
This site's visual direction is "build manifest" — an engineering-log
aesthetic (monospace headers, hairline rules, a blueprint-blue primary accent
+ amber status accent), deliberately distinct from the sibling site at
vladiant.github.io. Preserve it:
- Don't introduce gradients, drop shadows, or a second display typeface.
- Keep colors to the CSS custom properties defined at the top of
  `assets/css/style.css` (`--canvas`, `--panel`, `--ink`, `--blueprint`,
  `--amber`, `--rule`). If a new color is genuinely needed, add it as a named
  token there, not as an inline hex value in a component.
- `--blueprint` = links/primary actions. `--amber` = status/"done" ticks,
  the `featured` badge, and the module index numbers. Don't blend their
  roles (e.g. don't make amber a second link color).
- The hero ticker (`_includes/ticker.html`) is the one deliberately animated
  element on the page. It must keep working with
  `prefers-reduced-motion: reduce` (the CSS already gates the animation on
  `no-preference`) — don't add motion elsewhere without the same guard.

## Code style
- Plain HTML/Liquid/CSS/JS. No React/Vue, no CSS framework, no bundler.
- CSS: one flat `assets/css/style.css`, BEM-ish class names
  (`.card__head`, `.card--highlight`), custom properties for anything
  color/spacing that repeats.
- JS: vanilla, no dependencies, wrapped in an IIFE, feature-detect rather
  than assume (see `main.js`).
- Liquid: prefer filters (`push`, `uniq`, `sort`, `join`) over hardcoding
  values that are derivable from `_data/projects.yml`.

## Testing / verification
There's no test suite. Before committing:
1. `bundle exec jekyll build` — must exit 0 with no Liquid errors.
2. Open `_site/index.html` and check:
   - The manifest line's target/module counts match reality (they're
     computed from the data file, so a mismatch means a Liquid bug, not a
     data bug).
   - Every new/changed card's link resolves (spot-check `owner/name`).
   - The tag filter still isolates the right cards for any new tag.
3. Check keyboard focus is visible on nav links, filter chips, and cards
   (`:focus-visible` is defined in the CSS — don't remove it).

## PR / commit instructions
- Commit message prefix by what changed: `content:` for
  `_data/projects.yml`-only edits, `design:` for CSS/layout, `fix:` for bugs.
- Keep `_data/projects.yml` edits and design changes in separate commits
  where practical — content updates should be reviewable without a CSS diff
  in the way.
- This is a personal portfolio repo (no CI configured yet). If you add a
  GitHub Actions workflow for CI, follow the "Build Systems, Testing & CI/CD"
  module's own conventions from the portfolio content itself: static
  analysis + a basic HTML/link check, not a heavyweight pipeline.
