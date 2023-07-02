import { UserConfig, defineConfig, loadEnv} from 'vite';
import { resolve } from 'path';
import { mergeDeepRight } from 'ramda';
import { genBuildConfig, genServeConfig, Command} from './config'

export default defineConfig(({ command, mode}) => {

    const env = loadEnv(mode, resolve(__dirname,'environment'), '');

    const sharedConfig:UserConfig = {
        define:{
            APP_ENV:env
        }
    }

    let envConfig;

    switch(command){
        case Command.BUILD:
            envConfig = genBuildConfig(mode);
            break;
        case Command.SERVE:
            envConfig = genServeConfig(mode);
            break;
    }

    return  mergeDeepRight(sharedConfig,envConfig)
})
