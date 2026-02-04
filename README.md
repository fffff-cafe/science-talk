# Science talk

FFFFF Cafe メンバーによるプレゼンテーション共有サイトです。

## スライドの追加方法

`slides/` ディレクトリに Markdown ファイルを追加してください。

### ファイル名の形式

```
YYYYMMDD_author.md
```

例: `20260206_kixixixixi.md`

### Markdown の書き方

```markdown
# スライドのタイトル

@author

---

## 2枚目のスライド

内容

---

## 3枚目のスライド

内容
```

- 最初の `# 見出し` がスライドのタイトルになります
- `---` でスライドを区切ります

## 開発

```bash
pnpm install
pnpm dev
```

## 技術スタック

- Next.js 16
- React 19
- reveal.js
- TypeScript
