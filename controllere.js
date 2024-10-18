const { chromium } = require('playwright');

const appleSongsMusicDownloader = async (req, res) => {
  const url = req.body.url;

  // Launch the browser
  const browser = await chromium.launch({ headless: true });

  // Create a new context with a custom user agent
  const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
  });
  const page = await context.newPage();

  // Navigate to the website
  await page.goto('https://aaplmusicdownloader.com/');

  // Fill the input box
  await page.fill('#id_url', url);

  // Click the search button and wait for the AJAX response
  await Promise.all([
      page.click('#btn1'),
      page.waitForResponse(response => response.url().includes('api/applesearch.php') && response.status() === 200)
  ]);


     // Optionally wait for a specific element that indicates the page is ready
     await page.waitForTimeout(1000); // Wait for 1 second

     // Extract attributes from the download button
     const attributes = await page.$eval('#download_btn', element => {
       const attrs = {};
       for (let i = 0; i < element.attributes.length; i++) {
         const attr = element.attributes[i];
         attrs[attr.name] = attr.value;
       }
       return attrs;
     });


  // Wait for the download button to be clickable
  await page.waitForSelector('#download_btn');

  // Click the download button
  await page.click('#download_btn');

  // Wait for a moment to ensure any potential loading completes
  await page.waitForTimeout(2000); // Wait for 2 seconds

  // Wait for the #quality select element to be visible
  await page.waitForSelector('#qquality', { visible: true });

  // Set the value of the select element to 'm4a'
  await page.selectOption('#qquality', 'm4a');

  // Call the JavaScript function qselectOne() after setting the value
  await page.evaluate(() => {
      if (typeof qselectOne === 'function') {
          qselectOne();
      } else {
          console.error('qselectOne function is not defined');
      }
  });

  // Wait for the response after calling qselectOne
  const qualityResponse = await page.waitForResponse(response => response.url().includes('api/composer/swd.php') && response.status() === 200);
  
  // Retrieve the response body
  const qualityData = await qualityResponse.json();

  // Close the browser
  await browser.close();

  // Send the response back to the client

  let responseJSOn;

  if(qualityData.status=='success')
  {
    responseJSOn = {
      track_name:attributes.track_name,
      artist:attributes.artist,
      album:attributes.album,
      thumb:attributes.thumb,
      link:qualityData.dlink,
      success:true
    }
  }
    else
  {
    responseJSOn = {
      msg:qualityData.status.comments,
      success:false
    }
  }


  res.json(responseJSOn);
};


const spotifySongsMusicDownloader = async (req, res) => {
  const url = req.body.url;

  // Launch the browser
  const browser = await chromium.launch({ headless: true });

  // Create a new context with a custom user agent
  const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
  });
  const page = await context.newPage();

  // Navigate to the website
  await page.goto('https://spotisongdownloader.to/');

  // Fill the input box
  await page.fill('#id_url', url);

  // Click the search button and wait for the AJAX response
  await Promise.all([
      page.click('#btn1'),
      page.waitForResponse(response => response.url().includes('api/composer/spotify/xsingle_track.php') && response.status() === 200)
  ]);


     // Optionally wait for a specific element that indicates the page is ready
     await page.waitForTimeout(1000); // Wait for 1 second

     // Extract attributes from the download button
     const attributes = await page.$eval('#download_btn', element => {
       const attrs = {};
       for (let i = 0; i < element.attributes.length; i++) {
         const attr = element.attributes[i];
         attrs[attr.name] = attr.value;
       }
       return attrs;
     });


  // Wait for the download button to be clickable
  await page.waitForSelector('#download_btn');

  // Click the download button
  await page.click('#download_btn');

  // Wait for a moment to ensure any potential loading completes
  await page.waitForTimeout(2000); // Wait for 2 seconds

  // Wait for the #quality select element to be visible
  await page.waitForSelector('#qquality', { visible: true });

  // Set the value of the select element to 'm4a'
  await page.selectOption('#qquality', 'm4a');

  // Call the JavaScript function qselectOne() after setting the value
  await page.evaluate(() => {
      if (typeof qselectOne === 'function') {
          qselectOne();
      } else {
          console.error('qselectOne function is not defined');
      }
  });

  // Wait for the response after calling qselectOne
  const qualityResponse = await page.waitForResponse(response => response.url().includes('api/composer/spotify/rdctvybunimk.php') && response.status() === 200);
  
  // Retrieve the response body
  const qualityData = await qualityResponse.json();

  // Close the browser
  await browser.close();

  // Send the response back to the client

  let responseJSOn;

  if(qualityData.status=='success')
  {
    responseJSOn = {
      track_name:attributes.track_name,
      artist:attributes.artist,
      album:attributes.album,
      thumb:attributes.thumb,
      link:qualityData.dlink,
      success:true
    }
  }
    else
  {
    responseJSOn = {
      msg:qualityData.status.comments,
      success:false
    }
  }


  res.json(responseJSOn);
};

module.exports = {appleSongsMusicDownloader,spotifySongsMusicDownloader}