import newsdata from './news/news';
import blogdata from './blog/blog';
import meetupsdata from './meetups/meetups';
export default {
  BLOG: 'Blog',
  TAG: 'Tag filter',
  NEWS: 'News',
  BROWSE: 'Browse',
  TIMES: 'times',
  TIME: 'Time',
  AUTHOR: 'Author',
  TAGS: 'Tags',
  ALL: 'All',
  PREV: 'Previous:',
  DISCLAIMER:
    "[Disclaimer] This article only represents the author's opinions, and is irrelevant to this website. This website is neutral in terms of the statements and opinions in this article, and does not provide any express or implied warranty of accuracy, reliability, or completeness of the contents contained therein. This article is for readers' reference only, and all legal responsibilities arising therefrom are borne by the reader himself.",
  COPYRIGHT_1:
    '[Copyright] Copyright © 2024 openEuler Community. This article is first released by the openEuler community. Please reproduce it in compliance with the',
  COPYRIGHT_2:
    'license. Please note the text and keep the original link and author information when reproducing the article.',
  NEXT: 'Next:',
  STRATEGY: 'Post Your Blog',
  NEWSDATALIST: newsdata.en.NEWSLIST,
  BLOGDATALIST: blogdata.en.BLOGLIST,
  SCREENDATALIST: blogdata.en.SCREENBUTTON,
  TAGSDATALIST: blogdata.en.TAGS,
  MEETUPSLIST: meetupsdata.en.MEETUPS,
};
