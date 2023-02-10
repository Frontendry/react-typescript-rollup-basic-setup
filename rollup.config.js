import path from "path";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    image(),
    postcss({
      extensions: [".css"],
      extract: path.resolve("dist/style.css"),
    }),
    nodeResolve({
      extensions: [".js", ".ts", ".tsx"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true,
    }),
    babel({
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ compress: true }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "dist" }),
  ],
};
