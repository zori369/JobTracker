import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        ignores: ["node_modules/**", "dist/**"]
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: { prettier },
        rules: {
            ...prettier.rules, // Ensures Prettier formatting rules are applied
            "prettier/prettier": "error"
        }
    },
    {
        settings: { prettier: prettierConfig }
    }
];
