#!/usr/bin/env zx

$.verbose = false;

console.log('Retrieving sites...');
const sites = JSON.parse(await $`m365 spo site list -o json`);
for (let i = 0; i < sites.length; i++) {
  const site = sites[i];
  console.log(`(${i + 1}/${sites.length}) Retrieving lists for ${site.Url}...`);

  try {
    const lists = JSON.parse(await $`m365 spo list list -u ${site.Url} -o json`);
    lists.forEach(list => console.log(`  ${list.Title} ${list.Url}`));
  }
  catch (err) {
    console.error(`  ${chalk.red(err.stderr)}`);
  }
}