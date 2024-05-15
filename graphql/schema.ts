import { builder } from "./builder";
import "./types/Membership"
import "./types/User"
import "./types/Pick"

export const schema = builder.toSchema()