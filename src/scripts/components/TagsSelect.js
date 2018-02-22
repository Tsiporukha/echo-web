import React, {Component} from 'react';

import {primaryTags, primaryTagsColors, inTags} from '../lib/genres';

const TagsSelect = ({allTags, selectedTags, setTags, handleTagClick = tag => false, flashPrimary = true, theme}) => {
  const addTag = tag => setTags(selectedTags.concat(tag));
  const removeTag = tag => setTags(selectedTags.filter(tg => tg !== tag));

  const onTagClick = tag => () => {
    (inTags(tag, selectedTags) ? removeTag : addTag)(tag);
    return handleTagClick(tag);
  };

  const isSelectedAndPrimary = tag => inTags(tag, selectedTags) && inTags(tag, primaryTags);

  return (
    <div className={theme.tags}>
      {allTags.map(tag => (
        <span key={tag} className={inTags(tag, selectedTags) ? theme.selectedTag : theme.tag}
          style={flashPrimary && isSelectedAndPrimary(tag) ? {backgroundColor: primaryTagsColors[tag]} : {}}
          onClick={onTagClick(tag)}>{tag}</span>
      ))}
    </div>
  );
};

export default TagsSelect;
