import { Model, Timer } from "turtle-js/lib/index.js";
import { randomInteger } from "turtle-js/lib/utils/random.js";

const model = new Model(100, 100, 5);
const timer = new Timer(go, 16);

const TREE_DENSITY = 50;
const LIGHT_CHANCE = 75;

function setup() {
  for (const field of model.fields) {
    if (randomInteger(0, 100) >= TREE_DENSITY) {
      continue;
    }

    if (field.x === 0) {
      field.color = "red";
    } else {
      field.color = "green";
    }
  }

  model.update();
}

function go() {
  const treesOnFire = model.fields.filter((field) => field.color === "red");

  for (const fire of treesOnFire) {
    const treeNeighbors = model
      .neighborsOfField(fire)
      .filter((field) => field.color === "green");

    for (const tree of treeNeighbors) {
      if (randomInteger(0, 100) < LIGHT_CHANCE) {
        tree.color = "red";
      }
    }

    fire.color = "brown";
  }

  model.update();
}

setup();
timer.start();
