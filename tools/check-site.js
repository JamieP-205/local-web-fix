#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const ignored = new Set([".git", "node_modules"]);
const errors = [];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignored.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function exactPathExists(target) {
  const absolute = path.resolve(target);
  const parsed = path.parse(absolute);
  let current = parsed.root;
  for (const segment of absolute.slice(parsed.root.length).split(path.sep).filter(Boolean)) {
    const entries = fs.readdirSync(current);
    if (!entries.includes(segment)) return false;
    current = path.join(current, segment);
  }
  return true;
}

const files = walk(root);

for (const file of files.filter((item) => item.endsWith(".json"))) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(root, file)} contains invalid JSON: ${error.message}`);
  }
}

for (const file of files.filter((item) => /\.html?$/i.test(item))) {
  const source = fs.readFileSync(file, "utf8");
  if (!/<title>.+<\/title>/is.test(source)) errors.push(`${path.relative(root, file)} is missing a title`);
  if (!/<meta\s+name=["']description["']/i.test(source)) errors.push(`${path.relative(root, file)} is missing a description`);

  // The site is a concept, so nothing should be able to collect real enquiries.
  if (/data-netlify|netlify-honeypot/i.test(source)) {
    errors.push(`${path.relative(root, file)} contains Netlify Forms attributes`);
  }
  if (/\bmethod\s*=\s*["']?post\b/i.test(source)) {
    errors.push(`${path.relative(root, file)} contains a form that posts data`);
  }

  for (const match of source.matchAll(/(?:href|src)=["']([^"'#?]+)["']/gi)) {
    const reference = match[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(reference)) continue;
    let target = reference.startsWith("/")
      ? path.join(root, reference.slice(1))
      : path.resolve(path.dirname(file), reference);
    if (reference.endsWith("/")) target = path.join(target, "index.html");
    if (!exactPathExists(target)) {
      errors.push(`${path.relative(root, file)} references missing or case-mismatched file: ${reference}`);
    }
  }
}

for (const required of ["index.html", "404.html", "scope.html", "robots.txt", "sitemap.xml", "site.webmanifest", "netlify.toml"]) {
  const file = path.join(root, required);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) errors.push(`${required} is missing or empty`);
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!/Portfolio concept/i.test(homepage)) {
  errors.push("index.html must clearly identify Local Web Fix as a portfolio concept");
}
const demoForm = homepage.match(/<form\b([^>]*name=["']quick-review-demo["'][^>]*)>([\s\S]*?)<\/form>/i);
if (!demoForm || !/<fieldset\s+disabled\b/i.test(demoForm[2])) {
  errors.push("index.html must keep the example enquiry form inside <fieldset disabled>");
}
if (demoForm && /\b(?:action|method)\s*=/i.test(demoForm[1])) {
  errors.push("the example enquiry form must not have an action or method");
}

// The banner should be the first thing inside <main> so the skip link lands on it.
for (const page of ["index.html", "scope.html"]) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  if (!/class=["']concept-banner["']/i.test(source)) {
    errors.push(`${page} must show the portfolio-concept banner`);
  } else if (!/<main\b[^>]*>\s*<div class=["']concept-banner["']/i.test(source)) {
    errors.push(`${page} must have the concept banner as the first thing inside <main>`);
  }
}

const publicText = files
  .filter((file) => /\.(?:html?|md|js|json)$/i.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

if (/https:\/\/buy\.stripe\.com/i.test(publicText)) {
  errors.push("live Stripe payment links must not be present in the portfolio concept");
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Local Web Fix site validation passed.");
