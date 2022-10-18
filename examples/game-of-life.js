import { Model, Timer } from "turtle-js/lib/index.js";
import { randomInteger } from "turtle-js/lib/utils/random.js";

const model = new Model(100, 100, 5);
const timer = new Timer(go, 16);

function setup() {
  for (const field of model.fields) {
    if (randomInteger(0, 1)) {
      field.color = "white";
    }
  }

  model.update();
}

function go() {
  for (const field of model.fields) {
    const neighborCount = model
      .neighborsOfField(field)
      .filter((patch) => patch.color === "white").length;

    if (field.color === "white" && neighborCount >= 2 && neighborCount <= 3) {
      field.nextColor = "white";
    } else if (field.color === "black" && neighborCount === 3) {
      field.nextColor = "white";
    } else {
      field.nextColor = "black";
    }
  }

  for (const patch of model.fields) {
    patch.color = patch.nextColor;
  }

  for (const agent of model.agents) {
    agent.forward(5);
    agent.right(20);
  }

  model.update();
}

setup();
timer.start();
