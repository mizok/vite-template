import { UserConfig, defineConfig, loadEnv} from 'vite';
import { resolve } from 'path';
import { mergeDeepRight } from 'ramda';
import { genBuildConfig, genServeConfig, Command} from './config';
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ command, mode}) => {

    const env = loadEnv(mode, resolve(__dirname,'environment'), '');
    const sharedConfig:UserConfig = {
        define:{
            APP_ENV:env
        },
        plugins: [
            createHtmlPlugin({
              minify: true,
              pages: [
                {
                  entry: './src/pages/index/index.ts',
                  filename: 'index.html',
                  template: 'index.html',
                  injectOptions: {
                    data: {
                      title: 'index',
                    //   injectScript: `<script src="./inject.js"></script>`,
                    },
                    tags: [
                      {
                        injectTo: 'body-prepend',
                        tag: 'div',
                        attrs: {
                          id: 'tag1',
                        },
                      },
                    ],
                  },
                },
                {
                  entry: './src/pages/subpage/index.ts',
                  filename: 'subpage.html',
                  template: 'subpage.html',
                  injectOptions: {
                    data: {
                      title: 'subpage',
                    //   injectScript: `<script src="./inject.js"></script>`,
                    },
                    tags: [
                      {
                        injectTo: 'body-prepend',
                        tag: 'div',
                        attrs: {
                          id: 'tag2',
                        },
                      },
                    ],
                  },
                },
              ],
            }),
        ],
        build: {
            assetsDir:'assets',
        },
        resolve: {
          alias: {
            '@': resolve(__dirname, 'src'),
            '@images': resolve(__dirname, './src/assets/images'),
            '@fonts': resolve(__dirname, './src/assets/fonts'),
          }
        },
        server: {
            port: 5500,
            open: true,
            strictPort: true,
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
