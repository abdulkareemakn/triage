/** Every picture on the site is found in an open collection and credited here. */
export type MediaCredit = {
  title: string;
  creator: string;
  licence: string;
  licenceUrl: string;
  source: string;
  sourceLabel: string;
};

export const MEDIA_CREDITS: MediaCredit[] = [
  {
    title:
      "Marine Field Telephone Switchboard Operator, Guadalcanal, circa 1942",
    creator: "Archives Branch, USMC History Division",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
    source: "https://commons.wikimedia.org/w/index.php?curid=109890737",
    sourceLabel: "Wikimedia Commons",
  },
  {
    title: "1940s N935 telephone exchange",
    creator: "Rodhullandemu",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/w/index.php?curid=66686359",
    sourceLabel: "Wikimedia Commons",
  },
  {
    title: "Manchester Central Library card index drawers",
    creator: "Frankie Roberto",
    licence: "CC BY 2.0",
    licenceUrl: "https://creativecommons.org/licenses/by/2.0",
    source: "https://www.flickr.com/photos/84195101@N00/3378399311",
    sourceLabel: "Flickr",
  },
];

export function creditLine(credit: MediaCredit): string {
  return `“${credit.title}” by ${credit.creator}, ${credit.licence}, via ${credit.sourceLabel}`;
}
