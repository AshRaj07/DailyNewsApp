import React, { useEffect, useState } from "react";
import NewItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [state, setState] = useState({
    articles: [],
    loading: true,
    page: 1,
    totalResults: 0,
  });

  const captialize = (words) =>
    words
      .split(" ")
      .map((w) => w.substring(0, 1).toUpperCase() + w.substring(1))
      .join(" ");

  document.title = `Daily News - ${captialize(props.category)}`;

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${state.page}&pageSize=${props.pageSize}`;
    setState({ loading: true });
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(60);
    let parsedData = await data.json();
    props.setProgress(75);
    setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  });

  const fetchMoreData = async () => {
    setState({ page: state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${state.page}&pageSize=${props.pageSize}`;
    setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setState({
      articles: state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  return (
    <>
      <h1 className="text-center my-5">
        Daily News App - Top {captialize(props.category)} Headlines{" "}
      </h1>
      {state.loading && <Spinner />}
      <InfiniteScroll
        dataLength={state.articles.length}
        next={fetchMoreData}
        hasMore={state.articles.length !== state.totalResults}
        loader={<Spinner />}
        style={{ overflow: "inherit" }}
      >
        <div className="container">
          <div className="row my-5">
            {state.articles.map((element) => {
              return (
                <div className="col-12 col-md-4 my-3 mb-3" key={element.url}>
                  <NewItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://i.redd.it/dtljzwihuh861.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default News;
