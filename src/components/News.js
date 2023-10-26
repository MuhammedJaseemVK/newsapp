import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {
        return (
            <div className='container my-2'>
                <h2>NewsMonkey - Top headlines</h2>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title="mytitle" description="mydescription" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="mytitle" description="mydescription" />
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="mytitle" description="mydescription" />
                    </div>
                </div>
            </div>
        )
    }
}

export default News