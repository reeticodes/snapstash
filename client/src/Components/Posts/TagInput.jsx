import { useState,useEffect } from "react";
import './TagInput.css'


export default function TagInput({tags,setTags}) {
  useEffect(() => {
    console.log(tags)
  }, [tags])
  

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  
  return (
    <div >
      <h1>Tags input with React</h1>
      <div className="tag-container">
        {tags.map((tag, index) => {
          return (
            <div key={index} className="tag">
              {tag} <span onClick={() => removeTag(tag)}>x</span>
            </div>
          );
        })}

        <input onKeyDown={addTag} />
      </div>
    </div>
  );
}
