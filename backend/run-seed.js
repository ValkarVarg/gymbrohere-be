import data from "./data/dev-data/index.cjs";
import {seed} from "./seed.cjs";

import db from "./connection.cjs";

seed(data).then(() => db.end());