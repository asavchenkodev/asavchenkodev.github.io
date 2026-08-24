# asavchenkodev.github.io

My personal website: [asavchenkodev.github.io](https://asavchenkodev.github.io).

It's a small home for my projects, notes on computer vision and papers I've read, my CV, and a few browser tools I built for myself, such as a raw pixel viewer and a parallel-text reader. Posts will land here too.

The site looks and feels like browsing a directory in Emacs Dired. You can click around like on any other site, or use vim-style keys: `j`/`k` to move, `l`/`Enter` to open, `h` or `^` to go up, `/` to search, and `?` for the full list.

Everything is generated from plain Org and Markdown files in `content/`, so I can write in Emacs and the same links work both locally and on the site. It's built with React and Vite into static files in `docs/`, which GitHub Pages serves as is.

```sh
npm install
npm run dev     # local preview
npm run build   # rebuild docs/ before committing
```
