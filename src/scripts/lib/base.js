import v4 from 'uuid/v4';

export const addId = item => ({...item, id: v4()});
export const addIds = items => items.map(addId);

export const createIdKeyHash = item => ({[item.id]: item});

export const reduceToObject = items => items.reduce((itms, itm) => ({...itms, ...createIdKeyHash(itm)}), {});
export const addIdsAndReduceToObject = items => reduceToObject(addIds(items));
