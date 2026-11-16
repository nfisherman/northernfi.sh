import { loadEnvFile } from 'node:process';
// import * as fs from 'node:fs';
loadEnvFile('./.env');

export default async function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

    eleventyConfig.addGlobalData('site.URL', process.env.URL)

    const prodFunctions = () => {
        eleventyConfig.addShortcode('absolute_url', function(path) {
            return new URL(path, `https://${process.env.URL}/`).href;
        });
    }
    if (process.env.ENVIRONMENT == 'PROD') {
        prodFunctions();

        return {
            dir: {
                input: 'src',
                output: '../html'
            }
        }
    } else {
        eleventyConfig.addPassthroughCopy({'data': './'})

        if (process.env.ENVIRONMENT == 'FAKE_PROD') {
            prodFunctions();
        } else {
            eleventyConfig.addShortcode('absolute_url', function(path) { return path });
        }

        return {
            dir: {
                input: 'src',
                output: '_build'
            }
        }
    }
}