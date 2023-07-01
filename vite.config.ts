import { resolve } from 'path'
import { defineConfig } from 'vite'
import { BUILD_CONFIG, SERVE_CONFIG, Command} from './config'


export default defineConfig(({ command, mode, ssrBuild }) => {
    switch(command){
        case Command.BUILD:
            return BUILD_CONFIG;
        case Command.SERVE:
            return SERVE_CONFIG;
        default:
            return SERVE_CONFIG;
    }
})