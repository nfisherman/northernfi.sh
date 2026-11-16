import { loadEnvFile } from 'node:process';
// import * as fs from 'node:fs';
loadEnvFile('./.env');

export default async function(eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

    eleventyConfig.addGlobalData('site.URL', process.env.URL)

    if (process.env.ENVIRONMENT == 'PRODUCTION') {
        eleventyConfig.addShortcode('absolute_url', function(path) {
            return new URL(path, process.env.URL).href
        });

        return {
            dir: {
                input: 'src',
                output: '../html'
            }
        }
    } else {
        eleventyConfig.addPassthroughCopy({'data': './'})

        eleventyConfig.addShortcode('absolute_url', function(path) { return path });

        return {
            dir: {
                input: 'src',
                output: '_build'
            }
        }
    }
}