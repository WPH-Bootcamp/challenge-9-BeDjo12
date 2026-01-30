declare module "*.css";

declare module "*.svg" {
  import * as React from "react";
  const content: string;
  export default content;
}
