// import { fileURLToPath} from 'node:url'
import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        base: '/apps/',
        plugins: [react(), splitVendorChunkPlugin()],
        // build: {
        //     commonjsOptions: { transformMixedEsModules: true }, // Change
        //     // outDir: 'build'
        // },
        server: {
            port: 3000,
            open: true
        }
    }
})