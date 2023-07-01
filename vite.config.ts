import { defineConfig, loadEnv} from 'vite'
import {resolve} from 'path';
import { genBuildConfig, genServeConfig, Command} from './config'

export default defineConfig(({ command, mode}) => {

    const env = loadEnv(mode, resolve(__dirname,'environment'), '');

    switch(command){
        case Command.BUILD:
            return genBuildConfig(mode,env);
        case Command.SERVE:
            return genServeConfig(mode,env);
        default:
            return genServeConfig(mode,env);
    }
})