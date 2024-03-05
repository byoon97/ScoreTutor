import { builder } from "./builder";
import "./types/Membership"
import "./types/User"

export const schema = builder.toSchema()