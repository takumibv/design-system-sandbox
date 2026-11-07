import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// ../brief/fixtures.ts をそのまま読み込むため、親ディレクトリの読み取りを許可する
export default defineConfig({
  plugins: [react()],
  server: {fs: {allow: ['..']}},
})
