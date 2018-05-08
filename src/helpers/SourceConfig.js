const sourceMap = [
  {
    sourceType: 'WEB',
    channel: 'other',
    mapId: 'web',
    label: 'Survey Link',
    iconId: 'survey-lg'
  },
  {
    sourceType: 'EMAIL',
    channel: 'other',
    mapId: 'email',
    label: 'Email',
    iconId: 'send-email'
  },
  {
    sourceType: 'EMBED',
    channel: 'other',
    mapId: 'embed',
    label: 'Survey Embed',
    iconId: 'embed'
  },
  {
    sourceType: 'MOBILE',
    channel: 'instantly_app',
    mapId: 'mobile',
    label: 'Mobile',
    iconId: 'mobile-phone'
  },
  {
    sourceType: 'SOCIAL',
    channel: 'google.com',
    mapId: 'googlePlus',
    label: 'Google+',
    iconId: 'google'
  },
  {
    sourceType: 'SOCIAL',
    channel: 'facebook.com',
    mapId: 'facebook',
    label: 'Facebook',
    iconId: 'facebook'
  },
  {
    sourceType: 'SOCIAL',
    channel: 'linkedin.com',
    mapId: 'linkedIn',
    label: 'LinkedIn',
    iconId: 'linkedin'
  },
  {
    sourceType: 'SOCIAL',
    channel: 'twitter.com',
    mapId: 'twitter',
    label: 'Twitter',
    iconId: 'twitter'
  }
];

////////////

export default sourceMap;

export const getSourceConfig = source => {
  return sourceMap.find(
    mapItem =>
      mapItem.sourceType === source.sourceType &&
      mapItem.channel === source.channel
  );
};

export const getSourceConfigByMapId = mapId => {
  return sourceMap.find(mapItem => mapItem.mapId === mapId);
};
