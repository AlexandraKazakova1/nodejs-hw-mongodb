const parseType = (contactType) => {
  if (typeof contactType !== 'string') return undefined;

  const allowedTypes = ['work', 'home', 'personal'];
  return allowedTypes.includes(contactType) ? contactType : undefined;
};

const parseIsFavourite = (isFavourite) => {
  return isFavourite === 'true'
    ? true
    : isFavourite === 'false'
    ? false
    : undefined;
};

export const parseFilterParams = (query) => {
  if (!query || typeof query !== 'object') return {}; // Додаємо перевірку

  const { contactType, isFavourite } = query;

  return {
    contactType: parseType(contactType),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
