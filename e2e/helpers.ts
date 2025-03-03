import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
const sharp = require('sharp');

export function deleteAndRecreateFolder(folder) {
    if (fs.existsSync(folder)) {
        // Delete the directory and its contents
        fs.rmSync(folder, { recursive: true, force: true });
        console.log(`Directory deleted: ${folder}`);
    }
    // Recreate the directory
    fs.mkdirSync(folder, { recursive: true });
    console.log(`Directory created: ${folder}`);
}
export async function handleCookieBotConsent(page) {
    const cookieButtonSelector = '#CybotCookiebotDialogBodyButtonDecline';

    try {
        if (await page.locator(cookieButtonSelector).isVisible()) {
            await page.locator(cookieButtonSelector).click();
        }
    } catch (error) {
        console.error('Error while handling the cookie consent button:', error);
    }
}
export async function login(page, loginUrl) {
    console.log(`Logging in to ${loginUrl}`);
    await page.goto(loginUrl);
    await page.waitForTimeout(500);
    await page.locator("#cid").click();
    await page.locator('#cid').fill('playwright_login');
    await page.locator("#password").click();
    await page.locator("#password").fill('Un3WyHPqCM6H8kMrAXB8');
    await page.waitForTimeout(500);
    await page.click('button[name="btn_login"]');
}

export async function takeScreenshot(page, baseUrl, searchparams, searchTerms, outputFolder, search_debug) {
    var i = 0
    for (const term of searchTerms) {
        console.log(`Taking screenshot for search term: ${term}`);
        i = i + 1
        const url = `${baseUrl}search?${searchparams}&add_article=${encodeURIComponent(term)}` + (search_debug ? `&search_debug=1` : ``);
        const safeFileName = term.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const screenshotPath = path.join(outputFolder, `${i}-${safeFileName}.png`);

        await page.waitForTimeout(500);
        await page.goto(url);
        await page.content();
        await page.screenshot({
            path: screenshotPath, clip: {
                x: 0,
                y: 0,
                width: 1024,
                height: 16000,
            },
        });

    }
}

export async function combineScreenshots(newFolder: string, oldFolder: string, outputFolder: string) {
    // Ensure the output folder exists
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Get all files from the new screenshots folder
    const newScreenshots = fs.readdirSync(newFolder);

    for (const fileName of newScreenshots) {
        const newImagePath = path.join(newFolder, fileName);
        const oldImagePath = path.join(oldFolder, fileName);

        // Check if the corresponding file exists in the old folder
        if (fs.existsSync(oldImagePath)) {
            try {

                const outputFilePath = path.join(outputFolder, fileName);
                // Read metadata of both images to get their dimensions
                const [newImageMeta, oldImageMeta] = await Promise.all([
                    sharp(newImagePath).metadata(),
                    sharp(oldImagePath).metadata(),
                ]);

                // Ensure both images have the same height by resizing if necessary
                const maxHeight = Math.max(newImageMeta.height, oldImageMeta.height);

                const [newImageBuffer, oldImageBuffer] = await Promise.all([
                    sharp(newImagePath).resize({ height: maxHeight }).toBuffer(),
                    sharp(oldImagePath).resize({ height: maxHeight }).toBuffer(),
                ]);

                // Combine the two images side by side
                const combinedWidth = newImageMeta.width + oldImageMeta.width;
                await sharp({
                    create: {
                        width: combinedWidth,
                        height: maxHeight,
                        channels: 4,
                        background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
                    },
                })
                    .composite([
                        { input: oldImageBuffer, left: 0, top: 0 },
                        { input: newImageBuffer, left: oldImageMeta.width, top: 0 },
                    ])
                    .toFile(outputFilePath);

                console.log(`Combined image saved to ${outputFilePath}`);
            } catch (error) {
                console.error(`Error combining images for ${fileName}:`, error);
            }
        } else {
            console.warn(`No matching old screenshot for: ${fileName}`);
        }
    }
}


export async function getSearchTermsFromCSV(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const searchTerms: string[] = [];
        const searchterm_column_header = "Search Term"
        const limit = 20; // Limit the number of lines to 20
        let count = 0;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('headers', (headers) => {
                if (!headers.includes(searchterm_column_header)) {
                    reject(new Error(`CSV file does not contain the required column: ${searchterm_column_header}`));
                }
            })
            .on('data', (row) => {
                if (count >= limit) return;
                const searchTermValue = row[searchterm_column_header];
                if (searchTermValue) {
                    searchTerms.push(searchTermValue);
                    count++;
                }

            })
            .on('end', () => {
                console.log(`Loaded ${limit} out of ${searchTerms.length} search terms.`);
                resolve(searchTerms);
            })
            .on('error', (error) => {
                console.error('Error reading CSV:', error);
                reject(error);
            });
    });
}
