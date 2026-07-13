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

for (const required of ["index.html", "404.html", "privacy.html", "scope.html", "thanks.html", "pay.html", "robots.txt", "sitemap.xml", "site.webmanifest", "netlify.toml"]) {
  const file = path.join(root, required);
  if (!fs.existsSync(file) || fs.statSync(file).size === 0) errors.push(`${required} is missing or empty`);
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
const quickReviewForm = homepage.match(/<form\b(?=[^>]*\bname=["']quick-review["'])(?=[^>]*\bmethod=["']POST["'])(?=[^>]*\baction=["']\/thanks\.html["'])(?=[^>]*\bdata-netlify=["']true["'])(?=[^>]*\bnetlify-honeypot=["']bot-field["'])[^>]*>([\s\S]*?)<\/form>/i);
if (!quickReviewForm) {
  errors.push("index.html must contain the complete Netlify quick-review form setup");
} else {
  const formBody = quickReviewForm[1];
  if (!/<input\b(?=[^>]*\btype=["']hidden["'])(?=[^>]*\bname=["']form-name["'])(?=[^>]*\bvalue=["']quick-review["'])[^>]*>/i.test(formBody)) {
    errors.push("quick-review must include its hidden form-name field");
  }
  if (!/<input\b(?=[^>]*\bname=["']bot-field["'])[^>]*>/i.test(formBody)) {
    errors.push("quick-review must include its honeypot input");
  }
  if (!/<input\b(?=[^>]*\btype=["']hidden["'])(?=[^>]*\bname=["']subject["'])(?=[^>]*\bdata-remove-prefix\b)[^>]*>/i.test(formBody)) {
    errors.push("quick-review must keep the version-controlled notification subject");
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}
console.log("Local Web Fix site validation passed.");
