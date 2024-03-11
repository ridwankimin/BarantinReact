import { fileURLToPath} from 'node:url'
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        build: {
            commonjsOptions: { transformMixedEsModules: true } // Change
        },
        server: {
            port: 3000,
            open: true
        }
    }
})