source "https://rubygems.org"

# GitHub Pages builds this site with the versions pinned by the github-pages
# gem. Keep this as the single source of truth for local preview so
# `bundle exec jekyll serve` matches what GitHub actually deploys.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
end

# Windows/JRuby friendliness (harmless elsewhere, silences a common warning)
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
