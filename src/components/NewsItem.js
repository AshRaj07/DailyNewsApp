import React from "react";

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date,source }) => {
    
  return (
      <>
        <div className="card">
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:1,left:"50%"}}>
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author?author:"Unknown"} on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-outline-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </>
    );
  
}

export default NewsItem