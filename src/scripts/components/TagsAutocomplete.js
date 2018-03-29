import React from 'react';

import Autocomplete from 'react-toolbox/lib/autocomplete';


const TagsAutocomplete = ({allTags, addedTags, setTags, errorHandler, theme}) => {
  const tagsSuggestion = allTags.filter(tag => !addedTags.includes(tag));

  const handleTagsChange = tags => setTags([...tags.slice(1), tags[0]]);
  const addTag = tag => () => setTags([...addedTags, tag]);
  const removeTag = tag => () => setTags(addedTags.filter(t => t !== tag));


  return (
    <div>
      {addedTags.map(tag => (
        <span key={tag} className={theme.tag}>
          {tag}<i onClick={removeTag(tag)} className={theme.closeIcon}>close</i>
        </span>
      ))}
      <Autocomplete
        allowCreate
        multiple
        source={[...addedTags, ...allTags]}
        onChange={handleTagsChange}
        value={addedTags}
        theme={theme}
        direction='down'
        error={errorHandler}
      />
      <div>
        {tagsSuggestion.slice(0, 20).map(tag =>
          <span key={tag} onClick={addTag(tag)} className={theme.atag}>{tag}</span>
        )}
      </div>
    </div>
  );
};

export default TagsAutocomplete;
