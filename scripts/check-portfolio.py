#!/usr/bin/env python3
"""Dependency-free static checks for the GitHub Pages portfolio."""
from pathlib import Path
from html.parser import HTMLParser
import re

root = Path(__file__).resolve().parents[1] / "docs"
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "style.css").read_text(encoding="utf-8")
js = (root / "script.js").read_text(encoding="utf-8")

class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []
        self.h1_count = 0
        self.images = []
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if "id" in values:
            assert values["id"] not in self.ids, "duplicate ID: " + values["id"]
            self.ids.add(values["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "a":
            self.links.append(values)
        if tag == "img":
            self.images.append(values)

p = SiteParser()
p.feed(html)
assert p.h1_count == 1, "Expected one H1"
assert all("alt" in img for img in p.images), "Image without alt text"
for link in p.links:
    href = link.get("href", "")
    if href.startswith("#") and len(href) > 1:
        assert href[1:] in p.ids or href == "#top", "Broken anchor: " + href
    if href.startswith("./"):
        assert (root / href[2:].split("?")[0]).exists(), "Missing local link: " + href
    if link.get("target") == "_blank":
        assert "noopener" in link.get("rel", ""), "Unsafe external tab link"
assert (root / "Paolo_Pangallo_CV.pdf").read_bytes().startswith(b"%PDF-"), "Missing/invalid PDF header"
assert 'prefers-reduced-motion' in css, "Missing reduced motion preference"
assert '.decision-lab' in css and "engineeringNotes" in js, "Missing engineering interactions"
assert all(x in html for x in ('data-case="mcp"', 'data-case="mtb"', 'data-case="rl"'))
assert "Email: [da inserire]" not in html, "Incomplete placeholder"
print(f"OK: {len(p.ids)} IDs, {len(p.links)} links, {len(p.images)} images; downloadable CV and interactions present")
