import data from "./data/dev-data/index.cjs";
import {seed} from "./seed.js";

import db from "./connection.js";

seed(data).then(() => db.end());