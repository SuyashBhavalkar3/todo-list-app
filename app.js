const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("resources"));

const example = "Your Day To Day To-Do-List App";
let items = [];

// GET - Home Page
app.get("/", function(req, res) {
  const filter = req.query.filter || "All";
  let filteredItems = items;

  if (filter !== "All") {
    filteredItems = items.filter(item => item.priority === filter);
  }

  res.render("list", {
    itemsarray: filteredItems,
    exej: example,
    selectedPriority: filter
  });
});

// POST - Add New Task
app.post("/", function(req, res) {
  const text = req.body.ele1;
  const priority = req.body.priority || "Medium";

  if (text && text.trim() !== "") {
    items.push({ text: text.trim(), priority });
  }
  res.redirect("/");
});

// POST - Delete Task
app.post("/delete", function(req, res) {
  const index = parseInt(req.body.index);
  if (!isNaN(index)) {
    items.splice(index, 1);
  }
  res.redirect("/");
});

// POST - Update Task
app.post("/update", function(req, res) {
  const index = parseInt(req.body.index);
  const updatedText = req.body.updatedItem;
  const updatedPriority = req.body.updatedPriority || "Medium";

  if (!isNaN(index) && updatedText.trim() !== "") {
    items[index] = { text: updatedText.trim(), priority: updatedPriority };
  }
  res.redirect("/");
});

const port = process.env.PORT || 7700;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
