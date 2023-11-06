import React from 'react';

function Article({ id, i, title1, title2, title3, imageClass }) {
  return (
    <article id={id} style={{ '--i': i }}>
      <div className="hero-info">
        <h2>{title1}</h2>
        <h1>{title2}</h1>
        <h3>{title3}</h3>
      </div>
      <div className={`hero-image ${imageClass}`}></div>
    </article>
  );
}

export default Article;
