<p align="center">
</p>
<h1 align="center">
  Wildcards Blog
</h1>

## 🚀 Quick start

    ```
    npm start
    ```

Use 0.0.0.0:8000 instead of localhost:8000 in url if the screen is jumping

## Deploy

```
npm run deploy
```

## Tool to convert medium article to mark down

`mediumexporter` seems to be broken on lots of pages, rather use this repo: `git clone git@github.com:dtesler/medium-to-markdown.git` (and follow instructions in readme).

https://medium.com/@macropus/export-your-medium-posts-to-markdown-b5ccc8cb0050

install:

```
npm install -g mediumexporter
```

Example usage:

```
mediumexporter https://medium.com/@riobutton/b989a61be673 > content/blog/care-for-wild-as-rhino-poaching-soars/index.md
```
