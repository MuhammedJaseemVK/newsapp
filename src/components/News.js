import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        pageSize: 8,
        country: 'in',
        category: 'general'
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=60e92e40074843d7a7f0efd1c1d33049&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalPages,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=60e92e40074843d7a7f0efd1c1d33049&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalPages,
            loading: false
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: '34px 0px' }}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h1>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : 'https://www.hindustantimes.com/ht-img/img/2023/10/25/1600x900/amitabh_bachchan_rajinikanth_1698218501171_1698218501296.jpeg'} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div> */}
            </>
        )
    }
}

export default News