# Plan Viewer

## Why?

When working with [Claude Code](https://www.claude.com/product/claude-code)'s plan mode, it's desirable to view plans in a separate window from the CLI REPL terminal.
This allows you to reference the plan while working in the terminal, especially useful when using multiple monitors.

Researching macOS markdown viewers, the situation is pretty dire:

- **The Preview.app doesn't render markdown** - Apple's built-in viewer only shows raw text
- **Most markdown apps are editors** - They're designed for writing, not just viewing
- **Viewer-only options are paid software** - The few dedicated viewers require purchase

There had to be a simple, free solution for viewing Claude's plan files without leaving the terminal workflow.

## What?

This project is a small, lightweight viewer that converts Claude Code's markdown plan files to rendered HTML on the fly:

- **Browser-based viewing** - Renders markdown as HTML, serving it up to your browser
- **Index page** - Shows all plans in a sortable table with modification times
- **File system watching** - Automatically detects when Claude updates a plan, enabling auto-refresh when plan files change
- **Multiple device support** - When bound to all interfaces, viewable on other devices (e.g. iPad)
- **Clean typography** - Uses Inter and Fira Code fonts for professional presentation

The viewer reads plan files directly from Claude's storage directory (typically `~/.claude/plans`) without copying or modifying them.

## How?

This project is built atop [Astro](https://astro.build/) - a modern, competent, Node.js-based static website builder.

### Why Astro?

- **Content Collections API** - Perfect for loading markdown files from external directories
- **Dev server with hot reload** - Automatically watches file changes and refreshes the browser
- **Static site generation** - Fast, lightweight, no backend needed
- **Modern tooling** - TypeScript support, Tailwind CSS integration

### Unexpected benefits:

- **Auto-refresh on plan updates** - The dev server watches Claude's plan directory. When Claude updates a plan in the terminal, the browser tab automatically refreshes. This is fantastic on multi-monitor setups where you can see updates appear in real-time.
- **Cross-device viewing** - Run the dev server with `--host 0.0.0.0` to bind to all network interfaces. This makes the viewer accessible from other devices on your network (iPad, phone, etc.), perfect for reviewing plans away from your desk.
- **Live development** - Any styling or layout changes are instantly visible, making it easy to customize the viewer to your preferences.

The result is a minimal but powerful tool that stays out of the way while making Claude's plans easily accessible and readable.

## Getting Started

1. Clone this repository
2. Configure the `MARKDOWN_PLANS_PATH` environment variable (e.g. `~/.claude/plans`)
3. `cd astro && npm i && npm run dev`
4. Open [`http://localhost:4321/`](http://localhost:4321/) in your browser

Astro's default dev server restricts access by `Host` header.
If you want other devices on your local network to see the plans, or even let Claude Code fetch and review its own rendered plans using `curl`, then launch the dev server with:

```sh
npm run dev -- --host 0.0.0.0
```
