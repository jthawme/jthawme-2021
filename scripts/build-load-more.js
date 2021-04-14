const path = require("path");
const fs = require("fs");
const fm = require("front-matter");
const slugify = require("slugify");

const updatesFolderPath = path.join(__dirname, "..", "content", "updates");
const dataFolderPath = path.join(__dirname, "..", "static", "data");
const imagesFolderPath = path.join(__dirname, "..", "static", "images");
const getUpdateFile = (name) =>
  path.join(__dirname, "..", "content", "updates", name, "index.md");

const LIMIT = 10;

const updates = fs
  .readdirSync(updatesFolderPath)
  .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
  .map((name) => ({
    file: fs.readFileSync(getUpdateFile(name), "utf-8"),
    name,
  }))
  .map(({ file, name }) => ({
    name,
    obj: fm(file),
  }))
  .map(({ obj, name }) => ({
    ...obj.attributes,
    media: (obj.attributes.media || []).map((m) => {
      if (m.video) {
        return {
          video: {
            ...m.video,
            src: {
              publicURL: m.video.src,
            },
          },
        };
      }

      if (m.image) {
        return {
          image: {
            ...m.image,
            src: {
              publicURL: m.image.src,
            },
          },
        };
      }

      return m;
    }),
    body: obj.body,
    slug: `/updates/${slugify(name)}`,
    id: slugify(name),
  }))
  .sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

const chunked = [];

for (let i = 0; i < Math.ceil(updates.length / LIMIT); i++) {
  chunked.push(updates.slice(i * LIMIT, (i + 1) * LIMIT));
}

if (!fs.existsSync(dataFolderPath)) {
  fs.mkdirSync(dataFolderPath);
} else {
  const files = fs.readdirSync(dataFolderPath);

  files.forEach((name) => fs.unlinkSync(path.join(dataFolderPath, name)));
}

chunked.forEach((list, i) =>
  fs.writeFileSync(
    path.join(dataFolderPath, `${i + 1}.json`),
    JSON.stringify(list),
  ),
);

console.log("Exported extra data too");
