import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        console.log('hello i am a constructor from news');
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }
    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=60e92e40074843d7a7f0efd1c1d33049&page=1&pageSize=20';
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalPages: parsedData.totalPages })
    }

    handlePrevClick = async () => {
        console.log('previous');
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=60e92e40074843d7a7f0efd1c1d33049&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        })
    }
    handleNextClick = async () => {
        console.log('next');
        if (this.state.page + 1 > Math.ceil(this.state.totalPages / 20)) {

        }
        else {
        }
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=60e92e40074843d7a7f0efd1c1d33049&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        })
    }

    render() {
        console.log('render');
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : 'https://www.hindustantimes.com/ht-img/img/2023/10/25/1600x900/amitabh_bachchan_rajinikanth_1698218501171_1698218501296.jpeg'} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
                    <button type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News